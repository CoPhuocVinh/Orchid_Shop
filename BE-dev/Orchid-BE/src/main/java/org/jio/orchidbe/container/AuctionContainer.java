package org.jio.orchidbe.container;

import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.mappers.auctions.AuctionMapper;
import org.jio.orchidbe.mappers.bids.BiddingMapper;
import org.jio.orchidbe.models.Notification;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import org.jio.orchidbe.repositorys.auctions.AuctionRepository;
import org.jio.orchidbe.repositorys.auctions.BidRepository;
import org.jio.orchidbe.repositorys.notifis.NotificationRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.responses.AuctionDetailResponse;
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

    private List<Auction> remindAuctions;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private AuctionMapper auctionMapper;
    @Autowired
    private IFirebaseService<AuctionDetailResponse> firebaseAuctionService;
    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private BiddingMapper biddingMapper;
    @Autowired
    private AuctionRepository auctionRepository;

    public AuctionContainer() {
        this.auctions = new ArrayList<>();
        this.waitingAuctions = new ArrayList<>();
        this.comingAuctions = new ArrayList<>();
        this.liveAuctions = new ArrayList<>();
        this.remindAuctions = new ArrayList<>();
    }

    public void addAuction(Auction auction) throws ExecutionException, InterruptedException {
        if (!auction.getStatus().equals(Status.END)) {
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

    public Auction getAuctionOnStatusById(Long id, Status status) throws DataNotFoundException {
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
        List<Notification> notifications = new ArrayList<>();

        switch (auction.getStatus()) {
            case WAITING:
                waitingAuctions.add(auction);
                List<User> users = userRepository.findByRole(UserRole.ADMIN);

                if (users.size() > 0) {
                    for (User user : users) {

                        String msg = "Auction id: " + auction.getId() + " created, Please consider";
                        if (notificationRepository.existsByMsgAndUser_Id(msg, user.getId())) {

                        } else {
                            Notification notification = Notification
                                    .builder()
                                    .title("New auction create")
                                    .msg(msg)
                                    .user(user)
                                    .build();
                            notifications.add(notification);
                        }

                    }

                }
                notificationRepository.saveAll(notifications);
                break;
            case COMING:
                remindAuctions.add(auction);
                comingAuctions.add(auction);
                break;
            case LIVE:
                liveAuctions.add(auction);
                List<Bid> bids = bidRepository.findByAuction_Id(auction.getId());

                AuctionDetailResponse response = auctionMapper.toResponseDetail(auction);
                response.setBidList(bids.stream().map(biddingMapper::toResponse).toList());
                firebaseAuctionService.savev2(response, response.getId(), COLLECTION_AUCTION);

                if (bids.size() > 0) {
                    for (Bid bid : bids) {
                        String msg = "Auction id: " + auction.getId() + " Started, Please consider";
                        if (notificationRepository.existsByMsgAndUser_Id(msg, bid.getUser().getId())) {

                        } else {
                            Notification notification = Notification
                                    .builder()
                                    .title("auction Started")
                                    .msg(msg)
                                    .user(bid.getUser())
                                    .build();
                            notifications.add(notification);
                        }

                    }

                }
                notificationRepository.saveAll(notifications);


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

    public void removeAuctionRemind(Auction auction) throws DataNotFoundException {
        remindAuctions.remove(auction);

    }

    public List<Auction> getAuctions() {
        return auctions;
    }

    public List<Auction> getWaitingAuctions() {
        return waitingAuctions;
    }

    public List<Auction> getRemindAuctions() {
        return remindAuctions;
    }

    public List<Auction> getComingAuctions() {
        return comingAuctions;
    }

    public List<Auction> getLiveAuctions() {
        return liveAuctions;
    }
}
