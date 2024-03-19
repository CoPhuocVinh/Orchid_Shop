package org.jio.orchidbe.mappers.bids;

import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.requests.auctions.CreateAuctionResquest;
import org.jio.orchidbe.requests.bids.CreateBidRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.BiddingResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface BiddingMapper {
    @Mapping(source = "bid.auction.id", target = "auctionID")
    @Mapping(source = "bid.user.id", target = "userID")
    @Mapping(source = "bid.user.name", target = "userName")
    BiddingResponse toResponse(Bid bid);

    Bid toEntity(CreateBidRequest createBidRequest);
}
