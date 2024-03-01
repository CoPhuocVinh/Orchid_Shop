package org.jio.orchidbe.services.products;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.bids.BiddingMapper;
import org.jio.orchidbe.models.BidingStatus;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.BidRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.bids.CreateBidRequest;
import org.jio.orchidbe.requests.bids.GetAllBidRequest;
import org.jio.orchidbe.requests.bids.UpdateBiddingRequest;
import org.jio.orchidbe.requests.orders.GetAllOrderRequest;
import org.jio.orchidbe.responses.BiddingResponse;
import org.jio.orchidbe.responses.OrderResponse;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;

import java.lang.reflect.Field;
import java.util.Optional;

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
    @Transactional
    public BiddingResponse Bidding(CreateBidRequest createBidRequest) throws DataNotFoundException, BadRequestException {


        // check user register auction
        Bid userBid = bidRepository.findByUser_Id(createBidRequest.getUserID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find user with id: "+ createBidRequest.getUserID()));


        Auction auction = auctionRepository.findById(createBidRequest.getAuctionID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createBidRequest.getAuctionID()));

        Bid top1Bid = bidRepository.findByTop1TrueAndAuction_Id(createBidRequest.getAuctionID());
        if (top1Bid == null){
            // thg dau tien dau gia
            // > start price of auction + ..

            // set top 1

            //set rating  =1

            // set auction bidding
            if(createBidRequest.getBiddingPrice() > auction.getStartPrice()){

                userBid.setTop1(true);
                userBid.setRatings(1);
                auction.setBiddingPrice(createBidRequest.getBiddingPrice());

            }else {
                throw new BadRequestException("Bidding price must be greater than the start price.");
            }
        } else {
            // Existing bids, compare with top1 bid
            if (createBidRequest.getBiddingPrice() > top1Bid.getBiddingPrice() + auction.getDepositPrice()) {
                // Set the current user as top1 and update previous top1
                top1Bid.setTop1(false);
                userBid.setTop1(true);
                userBid.setRatings(top1Bid.getRatings() + 1);
                auction.setBiddingPrice(createBidRequest.getBiddingPrice());
            } else {
                throw new BadRequestException("Bidding price must be greater than the current top bid plus deposit.");
            }
        }

        userBid.setBiddingPrice(createBidRequest.getBiddingPrice());
        userBid.setStatus(BidingStatus.OPEN);

        return biddingMapper.toResponse(userBid);
    }




    @Override
    public Page<BiddingResponse> getAllBids(GetAllBidRequest getAllBidRequest) {
        return bidRepository.findAll(getAllBidRequest.getSpecification(), getAllBidRequest.getPageable())
                .map(biddingMapper::toResponse);
    }

    @Override
    public ResponseEntity updateBidding(UpdateBiddingRequest updateBiddingRequest, Long id, BindingResult bindingResult) throws ChangeSetPersister.NotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        final Bid bid = bidRepository.findById(id).orElseThrow(
                () -> new ChangeSetPersister.NotFoundException()
        );

        try {
            // đổ data theo field
            ReflectionUtils.doWithFields(updateBiddingRequest.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(updateBiddingRequest);
                if (newValue != null) { // lấy các giá trị không null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(bid.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, bid, newValue);
                    }
                }
            });

            Bid updateBid = bidRepository.save(bid);

            BiddingResponse bidResponse = biddingMapper.toResponse(updateBid);
            apiResponse.ok(bidResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (OptimisticLockingFailureException ex) {
            throw new OptimisticException("Data is updated by another user!");
        } catch (DataIntegrityViolationException e) {
            if (bindingResult.hasErrors()) {
                apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
                return ResponseEntity.badRequest().body(apiResponse);
            }
            throw new DataIntegrityViolationException("Contract data");
        }
    }

    @Override
    public BiddingResponse deleteBidding(Long id) throws DataNotFoundException {
        Optional<Bid> bid = bidRepository.findById(id);
        Bid existingBid = bid.orElseThrow(() -> new DataNotFoundException("Bidding not found with id: " + id));
        existingBid.setDeleted(true);
        Bid updatedBidding = bidRepository.save(existingBid);
        return biddingMapper.toResponse(updatedBidding);
    }

//    @Override
//    public BiddingResponse isTop1(Long id) throws DataNotFoundException {
//        Optional<Bid> bid = bidRepository.findById(id);
//        Bid existingBid = bid.orElseThrow(() -> new DataNotFoundException("Bidding not found with id: " + id));
//        existingBid.setTop1(true);
//        Bid updatedBidding = bidRepository.save(existingBid);
//        return biddingMapper.toResponse(updatedBidding);
//    }
}



