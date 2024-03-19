package org.jio.orchidbe.services.feedbacks;

import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.feedbacks.ReplyMapper;
import org.jio.orchidbe.enums.FBStatus;
import org.jio.orchidbe.models.feedbacks.Feedbacks;
import org.jio.orchidbe.models.feedbacks.Replys;
import org.jio.orchidbe.repositorys.feedbacks.FeedbackRepository;
import org.jio.orchidbe.repositorys.feedbacks.ReplyRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.feedbacks.UpdateFeedbackRequest;
import org.jio.orchidbe.requests.replys.CreateReplyRequest;
import org.jio.orchidbe.requests.replys.GetAllReplysRequest;
import org.jio.orchidbe.responses.ReplyResponse;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;

import java.lang.reflect.Field;
import java.util.Optional;

@Service
public class ReplyService implements IReplysService{
    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private ReplyMapper replyMapper;
    @Autowired
    private ValidatorUtil validatorUtil;
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public ReplyResponse createReply(CreateReplyRequest createReplyRequest) throws DataNotFoundException {
        Replys replys1 = replyMapper.toEntity(createReplyRequest);

        Feedbacks feedbacks = feedbackRepository.findById(createReplyRequest.getFeedbackID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createReplyRequest.getFeedbackID()));

        replys1.setFeedbacks(feedbacks);
        replys1.setStatus(FBStatus.OPEN);

        replyRepository.save(replys1);

        return replyMapper.toResponse(replys1);
    }

    @Override
    public Page<ReplyResponse> getAllReplys(GetAllReplysRequest getAllReplysRequest) {
        return replyRepository.findAll(getAllReplysRequest.getSpecification(), getAllReplysRequest.getPageable())
                .map(replyMapper::toResponse);
    }

    @Override
    public ReplyResponse deleteReply(Long id) throws DataNotFoundException {
        Optional<Replys> replys = replyRepository.findById(id);
        Replys existingReply = replys.orElseThrow(() -> new DataNotFoundException("Reply not found with id: " + id));
        existingReply.setDeleted(true);
        Replys updatedReply = replyRepository.save(existingReply);
        return replyMapper.toResponse(updatedReply);
    }

    @Override
    public ResponseEntity updateReply(UpdateFeedbackRequest updateFeedbackRequest, Long id, BindingResult bindingResult) throws ChangeSetPersister.NotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        final Replys replys = replyRepository.findById(id).orElseThrow(
                () -> new ChangeSetPersister.NotFoundException()
        );

        try {
            // đổ data theo field
            ReflectionUtils.doWithFields(updateFeedbackRequest.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(updateFeedbackRequest);
                if (newValue != null) { // lấy các giá trị không null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(replys.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, replys, newValue);
                    }
                }
            });
            replys.setStatus(FBStatus.UPDATED);

            Replys updateReply = replyRepository.save(replys);

            ReplyResponse replyResponse = replyMapper.toResponse(updateReply);
            apiResponse.ok(replyResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (OptimisticLockingFailureException ex) {
            throw new OptimisticException("Data is updated by another user!");
        } catch (DataIntegrityViolationException e) {
            if (bindingResult.hasErrors()) {
                apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
                return ResponseEntity.badRequest().body(apiResponse);
            }
            throw new DataIntegrityViolationException("Contract data");
        }
    }

}
