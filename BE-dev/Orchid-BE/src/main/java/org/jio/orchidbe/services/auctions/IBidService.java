package org.jio.orchidbe.services.auctions;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.auctions.GetAllAuctionResquest;
import org.jio.orchidbe.requests.bids.CreateBidRequest;
import org.jio.orchidbe.requests.bids.GetAllBidRequest;
import org.jio.orchidbe.requests.bids.UpdateBiddingRequest;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.requests.orders.UpdateOrderRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.BiddingResponse;
import org.jio.orchidbe.responses.OrderResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface IBidService {
    BiddingResponse Bidding(CreateBidRequest createBidRequest) throws DataNotFoundException, BadRequestException;

    Page<BiddingResponse> getAllBids(GetAllBidRequest getAllBidRequest);
    @Transactional
    ResponseEntity updateBidding(UpdateBiddingRequest updateBiddingRequest, Long id,
                                 BindingResult bindingResult) throws ChangeSetPersister.NotFoundException;

    BiddingResponse deleteBidding(Long id) throws DataNotFoundException;

    ResponseEntity biddingAuction(UpdateBiddingRequest updateBiddingRequest, Long id, BindingResult bindingResult) throws DataNotFoundException, BadRequestException;
//    BiddingResponse isTop1(Long id) throws DataNotFoundException;
}
