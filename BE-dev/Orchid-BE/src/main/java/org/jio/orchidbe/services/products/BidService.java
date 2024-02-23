package org.jio.orchidbe.services.products;

import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.mappers.bids.BiddingMapper;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.BidRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.bids.CreateBidRequest;
import org.jio.orchidbe.requests.bids.GetAllBidRequest;
import org.jio.orchidbe.requests.orders.GetAllOrderRequest;
import org.jio.orchidbe.responses.BiddingResponse;
import org.jio.orchidbe.responses.OrderResponse;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class BidService implements IBidService{

    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private BiddingMapper biddingMapper;
    @Autowired
    private ValidatorUtil validatorUtil;
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public BiddingResponse createBid(CreateBidRequest createBidRequest) throws DataNotFoundException, BadRequestException {
        Bid bid1 = biddingMapper.toEntity(createBidRequest);

        Auction auction = auctionRepository.findById(createBidRequest.getAuctionID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createBidRequest.getAuctionID()));
        User user = userRepository.findById(createBidRequest.getUserID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createBidRequest.getUserID()));
        bid1.setAuction(auction);
        bid1.setUser(user);
        bid1.setStatus(Status.WAITING);
        bidRepository.save(bid1);

        return biddingMapper.toResponse(bid1);
    }

    @Override
    public Page<BiddingResponse> getAllBids(GetAllBidRequest getAllBidRequest) {
        return bidRepository.findAll(getAllBidRequest.getSpecification(), getAllBidRequest.getPageable())
                .map(biddingMapper::toResponse);
    }



}


