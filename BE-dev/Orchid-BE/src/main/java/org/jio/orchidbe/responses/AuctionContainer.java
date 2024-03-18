package org.jio.orchidbe.responses;

import org.jio.orchidbe.exceptions.DataNotFoundException;
import  org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.mappers.auctions.AuctionMapper;
import org.jio.orchidbe.mappers.bids.BiddingMapper;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.repositorys.auctions.BidRepository;
import org.jio.orchidbe.services.firebase.IFirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.jio.orchidbe.constants.BaseConstants.COLLECTION_AUCTION;


@Component
@Configuration
public class AuctionContainer {
    private List<Auction> auctions;
    private List<Auction> waitingAuctions;
    private List<Auction> comingAuctions;
    private List<Auction> liveAuctions;
    @Autowired
    private AuctionMapper auctionMapper;
    @Autowired
    private IFirebaseService<AuctionDetailResponse> firebaseAuctionService;
    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private BiddingMapper biddingMapper;
    public AuctionContainer() {
        this.auctions = new ArrayList<>();
        this.waitingAuctions = new ArrayList<>();
        this.comingAuctions = new ArrayList<>();
        this.liveAuctions = new ArrayList<>();
    }

    public void addAuction(Auction auction) throws ExecutionException, InterruptedException {
        if (!auction.getStatus().equals(Status.END)){
            auctions.add(auction);
            updateAuctionLists(auction);
        }

    }

    public Auction getAuctionById(Long id) throws DataNotFoundException {
        for (Auction auction : auctions) {
            if (auction.getId().equals(id)) {
                return auction;
            }
        }
        return null;
    }

    public Auction getAuctionOnStatusById(Long id,Status status) throws DataNotFoundException {
        switch (status) {
            case WAITING:
                for (Auction auction : waitingAuctions) {
                    if (auction.getId().equals(id)) {
                        return auction;
                    }
                }
                break;
            case COMING:
                for (Auction auction : comingAuctions) {
                    if (auction.getId().equals(id)) {
                        return auction;
                    }
                }
                break;
            case LIVE:
                for (Auction auction : liveAuctions) {
                    if (auction.getId().equals(id)) {
                        return auction;
                    }
                }
                break;
            default:
                break;
        }
        return null;
    }

    public Boolean removeOnAuctionListById(Long id) throws DataNotFoundException {
        for (Auction auction : auctions) {
            if (auction.getId().equals(id)) {
                auctions.remove(auction);
                return true;
            }
        }
        throw new DataNotFoundException(
                "Cannot find auction with id: " + id);
    }
    public void removeAuctionFromList(Auction auction, Status statusToRemoveFrom) {

        switch (statusToRemoveFrom) {
            case WAITING:
                if (waitingAuctions.contains(auction)) {
                    waitingAuctions.remove(auction);
                }
                break;
            case COMING:
                if (comingAuctions.contains(auction)) {
                    comingAuctions.remove(auction);
                }
                break;
            case LIVE:
                if (liveAuctions.contains(auction)) {
                    liveAuctions.remove(auction);
                }
                break;
            default:
                break;
        }
    }
    private void updateAuctionLists(Auction auction) throws ExecutionException, InterruptedException {
        switch (auction.getStatus()) {
            case WAITING:
                waitingAuctions.add(auction);
                break;
            case COMING:
                comingAuctions.add(auction);
                break;
            case LIVE:
                liveAuctions.add(auction);
                List<Bid> bids = bidRepository.findByAuction_Id(auction.getId());

                AuctionDetailResponse response = auctionMapper.toResponseDetail(auction);
                response.setBidList(bids.stream().map(biddingMapper::toResponse).toList());
                firebaseAuctionService.savev2(response,response.getId(),COLLECTION_AUCTION);
                break;
            default:
                break;
        }
    }

    public void removeOnStatusLists(Auction auction) {
        switch (auction.getStatus()) {
            case WAITING:
                waitingAuctions.remove(auction);
                break;
            case COMING:
                comingAuctions.remove(auction);
                break;
            case LIVE:
                liveAuctions.remove(auction);
                break;
            default:
                break;
        }
    }

    public void moveAuctionToList(Auction auction, Status newStatus) {
        auction.setStatus(newStatus);
        switch (newStatus) {
            case WAITING:
                waitingAuctions.add(auction);
                break;
            case COMING:
                comingAuctions.add(auction);
                break;
            case LIVE:
                liveAuctions.add(auction);
                break;
            default:
                break;
        }
    }
    public List<Auction> getAuctions() {
        return auctions;
    }

    public List<Auction> getWaitingAuctions() {
        return waitingAuctions;
    }

    public List<Auction> getComingAuctions() {
        return comingAuctions;
    }

    public List<Auction> getLiveAuctions() {
        return liveAuctions;
    }
}
