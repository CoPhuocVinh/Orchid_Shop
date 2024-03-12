package org.jio.orchidbe.controller.feedbacks;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.feedbacks.CreateFeedbackRequest;
import org.jio.orchidbe.requests.feedbacks.GetAllFeedbackRequest;
import org.jio.orchidbe.requests.feedbacks.UpdateFeedbackRequest;
import org.jio.orchidbe.responses.FeedbackResponse;
import org.jio.orchidbe.services.feedbacks.IFeedbackService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {
    private final IFeedbackService feedbackService;
    private final ValidatorUtil validatorUtil;

    @PostMapping("create")
    public ResponseEntity<?> createFeedback(
            @Valid @RequestBody CreateFeedbackRequest createFeedbackRequest,
            BindingResult result
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        FeedbackResponse newFB = feedbackService.createFeedback(createFeedbackRequest);

        apiResponse.ok(newFB);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("list")
    public ResponseEntity<?> getFeedbacks(@ModelAttribute GetAllFeedbackRequest getAllFeedbackRequest){
        ApiResponse apiResponse = new ApiResponse();

        Page<FeedbackResponse> FBPage = feedbackService.getAllFeedbacks(getAllFeedbackRequest);
        apiResponse.ok(FBPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("update-feedback/{id}")
    public ResponseEntity updateReply(@PathVariable("id") Long id,
                                      @RequestBody UpdateFeedbackRequest updateFeedbackRequest,
                                      BindingResult bindingResult) throws ChangeSetPersister.NotFoundException{

        return feedbackService.updateFB(updateFeedbackRequest, id, bindingResult);

    }

    @DeleteMapping("/delete-feedback/{id}")
    public ResponseEntity<?> deleteFeedback(
            @PathVariable("id") Long id
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();

        FeedbackResponse deletedFeedback = feedbackService.deleteFeedback(id);

        apiResponse.ok(deletedFeedback);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}