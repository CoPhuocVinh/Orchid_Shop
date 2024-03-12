package org.jio.orchidbe.services.feedbacks;

import jakarta.transaction.Transactional;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.feedbacks.CreateFeedbackRequest;
import org.jio.orchidbe.requests.feedbacks.GetAllFeedbackRequest;
import org.jio.orchidbe.requests.feedbacks.UpdateFeedbackRequest;
import org.jio.orchidbe.requests.replys.CreateReplyRequest;
import org.jio.orchidbe.requests.replys.GetAllReplysRequest;
import org.jio.orchidbe.responses.FeedbackResponse;
import org.jio.orchidbe.responses.ReplyResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface IReplysService {
    ReplyResponse createReply(CreateReplyRequest createReplyRequest) throws DataNotFoundException;
    Page<ReplyResponse> getAllReplys(GetAllReplysRequest getAllReplysRequest);
    ReplyResponse deleteReply(Long id) throws DataNotFoundException;
    @Transactional
    ResponseEntity updateReply(UpdateFeedbackRequest updateFeedbackRequest, Long id,
                            BindingResult bindingResult) throws ChangeSetPersister.NotFoundException;
}
