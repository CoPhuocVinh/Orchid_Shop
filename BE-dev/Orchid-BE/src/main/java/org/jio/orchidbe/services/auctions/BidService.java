package org.jio.orchidbe.services.auctions;

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.bids.BiddingMapper;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.repositorys.auctions.AuctionRepository;
import org.jio.orchidbe.repositorys.auctions.BidRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.bids.CreateBidRequest;
import org.jio.orchidbe.requests.bids.GetAllBidRequest;
import org.jio.orchidbe.requests.bids.UpdateBiddingRequest;

import org.jio.orchidbe.container.AuctionContainer;

import org.jio.orchidbe.responses.BiddingResponse;
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
import org.springframework.web.server.NotAcceptableStatusException;

import java.lang.reflect.Field;
import java.util.Optional;

@Service
@Log4j2
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
    @Autowired
    private AuctionContainer auctionContainer;
    @Override
    @Transactional
    public BiddingResponse Bidding(CreateBidRequest createBidRequest) throws DataNotFoundException, BadRequestException {


            Auction auction = auctionContainer.getAuctionOnStatusById(createBidRequest.getAuctionID(), Status.LIVE);
            //* THAY THẾ = LIST LIVE AUCTION TRONG AUCTION CONTAINER
            if (auction == null){
                throw new DataNotFoundException("auction not live, can not Bidding");
            }


            // check user register auction
            Bid userBid = bidRepository.findByUser_IdAndAuction_Id(createBidRequest.getUserID(),createBidRequest.getAuctionID())
                    .orElseThrow(
                            () -> new NotAcceptableStatusException("user must register to bidding")
                    );

            Bid top1Bid = bidRepository.findByAuctionIdAndTop1(createBidRequest.getAuctionID(), true);
            if (top1Bid == null){
                // thg dau tien dau gia
                // > start price of auction + ..

                // set top 1

                //set rating  =1

                // set auction bidding
                if(createBidRequest.getBiddingPrice() >= auction.getStartPrice()){

                    userBid.setTop1(true);
                    userBid.setRatings(1);
                    auction.setBiddingPrice(createBidRequest.getBiddingPrice());

                }else {
                    throw new BadRequestException("Bidding price must be greater than the start price.");
                }
            } else {
                // Existing bids, compare with top1 bid
                if (createBidRequest.getBiddingPrice() >= top1Bid.getBiddingPrice() + auction.getDepositPrice()) {
                    if (top1Bid.getId() == userBid.getId()){

                    }else {
                        // Set the current user as top1 and update previous top1
                        top1Bid.setTop1(false);
                        userBid.setTop1(true);
                    }

                    userBid.setRatings(top1Bid.getRatings() + 1);
                    auction.setBiddingPrice(createBidRequest.getBiddingPrice());
                } else {
                    throw new BadRequestException("Bidding price must be greater than the current top bid plus deposit.");
                }
            }

            userBid.setBiddingPrice(createBidRequest.getBiddingPrice());

            auction.setModifiedBy(userBid.getUser().getName());

            // container
            auctionContainer.removeOnAuctionListById(auction.getId());
            auctionContainer.removeOnStatusLists(auction);
        try{
            // repository
            auctionRepository.save(auction);

        }catch (Exception ex){
            System.out.println(ex.getMessage());
            log.info(ex.getMessage());
        }
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
    public BiddingResponse deleteBidding(Long  id) throws DataNotFoundException {
        Optional<Bid> bid = bidRepository.findById(id);
        Bid existingBid = bid.orElseThrow(() -> new DataNotFoundException("Bidding not found with id: " + id));
        existingBid.setDeleted(true);
        Bid updatedBidding = bidRepository.save(existingBid);
        return biddingMapper.toResponse(updatedBidding);
    }

    @Override
    public ResponseEntity biddingAuction(UpdateBiddingRequest updateBiddingRequest, Long id, BindingResult bindingResult) throws DataNotFoundException, BadRequestException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        Bid bid = bidRepository.findByUser_IdAndAuction_Id(updateBiddingRequest.getUserId(),id).orElseThrow(
                () -> new BadRequestException("user must register to bidding")
        );


        return null;
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



