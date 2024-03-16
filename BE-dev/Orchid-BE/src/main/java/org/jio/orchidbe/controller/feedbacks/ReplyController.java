package org.jio.orchidbe.controller.feedbacks;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.feedbacks.UpdateFeedbackRequest;
import org.jio.orchidbe.requests.replys.CreateReplyRequest;
import org.jio.orchidbe.requests.replys.GetAllReplysRequest;
import org.jio.orchidbe.responses.ReplyResponse;
import org.jio.orchidbe.services.feedbacks.IReplysService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/replys")
@RequiredArgsConstructor
public class ReplyController {
    private final IReplysService replysService;
    private final ValidatorUtil validatorUtil;

    @PostMapping("create")
    public ResponseEntity<?> createReply(
            @Valid @RequestBody CreateReplyRequest createReplyRequest,
            BindingResult result
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        ReplyResponse newReply = replysService.createReply(createReplyRequest);

        apiResponse.ok(newReply);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("list")
    public ResponseEntity<?> getReplys(@ModelAttribute GetAllReplysRequest getAllReplysRequest){
        ApiResponse apiResponse = new ApiResponse();

        Page<ReplyResponse> replyPage = replysService.getAllReplys(getAllReplysRequest);
        apiResponse.ok(replyPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("update-reply/{id}")
    public ResponseEntity updateReply(@PathVariable("id") Long id,
                                    @RequestBody UpdateFeedbackRequest updateFeedbackRequest,
                                    BindingResult bindingResult) throws ChangeSetPersister.NotFoundException{

        return replysService.updateReply(updateFeedbackRequest, id, bindingResult);

    }

    @DeleteMapping("/delete-reply/{id}") // Sử dụng @DeleteMapping thay vì @PostMapping
    public ResponseEntity<?> deleteReply(
            @PathVariable("id") Long id
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();

        ReplyResponse deletedReply = replysService.deleteReply(id);

        apiResponse.ok(deletedReply);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
