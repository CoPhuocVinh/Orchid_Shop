package org.jio.orchidbe.mappers.feedbacks;

import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.feedbacks.Feedbacks;
import org.jio.orchidbe.requests.bids.CreateBidRequest;
import org.jio.orchidbe.requests.feedbacks.CreateFeedbackRequest;
import org.jio.orchidbe.responses.BiddingResponse;
import org.jio.orchidbe.responses.FeedbackResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface FeedbackMapper {
    FeedbackResponse toResponse(Feedbacks feedbacks);

    @Mapping(target = "product",  ignore = true)
    @Mapping(target = "user", ignore = true)
    Feedbacks toEntity(CreateFeedbackRequest createFeedbackRequest);
}
