package org.jio.orchidbe.services.products;

import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.bids.BiddingMapper;
import org.jio.orchidbe.mappers.feedbacks.FeedbackMapper;
import org.jio.orchidbe.models.FBStatus;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.feedbacks.Feedbacks;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.BidRepository;
import org.jio.orchidbe.repositorys.products.FeedbackRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.feedbacks.CreateFeedbackRequest;
import org.jio.orchidbe.requests.feedbacks.GetAllFeedbackRequest;
import org.jio.orchidbe.requests.feedbacks.UpdateFeedbackRequest;
import org.jio.orchidbe.responses.BiddingResponse;
import org.jio.orchidbe.responses.FeedbackResponse;
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
public class FeedbackService implements IFeedbackService{

    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private FeedbackMapper feedbackMapper;
    @Autowired
    private ValidatorUtil validatorUtil;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public FeedbackResponse createFeedback(CreateFeedbackRequest createFeedbackRequest) throws DataNotFoundException {
        Feedbacks feedbacks1 = feedbackMapper.toEntity(createFeedbackRequest);

        Product product = productRepository.findById(createFeedbackRequest.getProductID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createFeedbackRequest.getProductID()));
        User user = userRepository.findById(createFeedbackRequest.getUserID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createFeedbackRequest.getUserID()));
        feedbacks1.setProduct(product);
        feedbacks1.setUser(user);
        feedbacks1.setStatus(FBStatus.OPEN);
        feedbackRepository.save(feedbacks1);

        return feedbackMapper.toResponse(feedbacks1);
    }



    @Override
    public Page<FeedbackResponse> getAllFeedbacks(GetAllFeedbackRequest getAllFeedbackRequest) {
        return feedbackRepository.findAll(getAllFeedbackRequest.getSpecification(), getAllFeedbackRequest.getPageable())
                .map(feedbackMapper::toResponse);
    }

    @Override
    public FeedbackResponse deleteFeedback(Long id) throws DataNotFoundException {
        Optional<Feedbacks> fb = feedbackRepository.findById(id);
        Feedbacks existingFb = fb.orElseThrow(() -> new DataNotFoundException("Feedback not found with id: " + id));
        existingFb.setDeleted(true);
        Feedbacks updatedFb = feedbackRepository.save(existingFb);
        return feedbackMapper.toResponse(updatedFb);
    }

    @Override
    public ResponseEntity updateFB(UpdateFeedbackRequest updateFeedbackRequest, Long id, BindingResult bindingResult) throws ChangeSetPersister.NotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        final Feedbacks fb = feedbackRepository.findById(id).orElseThrow(
                () -> new ChangeSetPersister.NotFoundException()
        );

        try {
            // đổ data theo field
            ReflectionUtils.doWithFields(updateFeedbackRequest.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(updateFeedbackRequest);
                if (newValue != null) { // lấy các giá trị không null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(fb.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, fb, newValue);
                    }
                }
            });
            fb.setStatus(FBStatus.UPDATED);

            Feedbacks updateFb = feedbackRepository.save(fb);

            FeedbackResponse fbResponse = feedbackMapper.toResponse(updateFb);
            apiResponse.ok(fbResponse);
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
