package org.jio.orchidbe.services.products;

import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.auctions.GetAllAuctionResquest;
import org.jio.orchidbe.requests.bids.CreateBidRequest;
import org.jio.orchidbe.requests.bids.GetAllBidRequest;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.BiddingResponse;
import org.jio.orchidbe.responses.OrderResponse;
import org.springframework.data.domain.Page;

public interface IBidService {
    BiddingResponse createBid(CreateBidRequest createBidRequest) throws DataNotFoundException, BadRequestException;

    Page<BiddingResponse> getAllBids(GetAllBidRequest getAllBidRequest);
}
