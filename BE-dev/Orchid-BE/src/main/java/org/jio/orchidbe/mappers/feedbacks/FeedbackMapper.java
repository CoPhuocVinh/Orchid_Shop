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

    @Mapping(source = "feedbacks.auction.id", target = "auctionID")
    @Mapping(source = "feedbacks.user.id", target = "userID")
    @Mapping(source = "user.name", target = "name")
    @Mapping(source = "user.img", target = "img")
    FeedbackResponse toResponse(Feedbacks feedbacks);


    Feedbacks toEntity(CreateFeedbackRequest createFeedbackRequest);
}
