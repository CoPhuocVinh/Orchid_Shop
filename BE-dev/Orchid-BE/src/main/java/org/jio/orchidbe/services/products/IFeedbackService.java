package org.jio.orchidbe.services.products;

import jakarta.transaction.Transactional;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.auctions.UpdateAuctionRequest;
import org.jio.orchidbe.requests.feedbacks.CreateFeedbackRequest;
import org.jio.orchidbe.requests.feedbacks.GetAllFeedbackRequest;
import org.jio.orchidbe.requests.feedbacks.UpdateFeedbackRequest;
import org.jio.orchidbe.responses.FeedbackResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface IFeedbackService {
    FeedbackResponse createFeedback(CreateFeedbackRequest createFeedbackRequest) throws DataNotFoundException;
    Page<FeedbackResponse> getAllFeedbacks(GetAllFeedbackRequest getAllFeedbackRequest);
    FeedbackResponse deleteFeedback(Long id) throws DataNotFoundException;
    @Transactional
    ResponseEntity updateFB(UpdateFeedbackRequest updateFeedbackRequest, Long id,
                            BindingResult bindingResult) throws ChangeSetPersister.NotFoundException;
}
