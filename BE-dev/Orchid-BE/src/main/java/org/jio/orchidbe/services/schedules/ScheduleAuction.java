package org.jio.orchidbe.services.schedules;

import lombok.extern.log4j.Log4j2;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.mappers.auctions.AuctionMapper;
import org.jio.orchidbe.models.Notification;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import org.jio.orchidbe.repositorys.auctions.AuctionRepository;
import org.jio.orchidbe.repositorys.auctions.BidRepository;
import org.jio.orchidbe.repositorys.notifis.NotificationRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.jio.orchidbe.container.AuctionContainer;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.responses.AuctionDetailResponse;
import org.jio.orchidbe.services.auctions.IAuctionService;
import org.jio.orchidbe.services.firebase.IFirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import static org.jio.orchidbe.utils.WebUtils.convertCurrentToLocalDateTimeWithZone;


@Service
@Log4j2
public class ScheduleAuction {
    @Autowired
    private AuctionContainer auctionContainer;
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private IAuctionService auctionService;
    @Autowired
    private ProductRepository productRepository;
    //private Logger logger = Logger.getLogger(getClass().getName());
    @Autowired
    private AuctionMapper auctionMapper;
    @Autowired
    private IFirebaseService<AuctionDetailResponse> firebaseAuctionService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private BidRepository bidRepository;
    @Scheduled(fixedDelay = 10000) // Kiểm tra mỗi 60 giây
    public void checkAuctionEndings() throws DataNotFoundException, ExecutionException, InterruptedException {
        LocalDateTime currentTime = convertCurrentToLocalDateTimeWithZone();


        List<Auction> auctions = getAuctionsEndingBefore(currentTime, Status.LIVE);

        for (Auction auction : auctions) {
            // Truyền số lượng vào phương thức endAuction
            auctionService.endAuction(auction);
        }
    }

    private List<Auction> getAuctionsEndingBefore(LocalDateTime endTime, Status status) {
        return auctionContainer.getLiveAuctions().stream()
                .filter(auction -> endTime.isAfter(auction.getEndDate()) && auction.getStatus() == status)
                .collect(Collectors.toList());
    }

    // FROM COMING TO LIVE
    @Scheduled(fixedRate = 10000) // Run every 1 minute
    public void checkAuctionStatus() throws DataNotFoundException, ExecutionException, InterruptedException {
        LocalDateTime currentTime = convertCurrentToLocalDateTimeWithZone();
        List<Auction> pendingAuctions = getPendingAuctionsStartingAfter(currentTime, Status.COMING);
        List<Auction> remindingAuctions = getAuctionsRemindingAfter(currentTime, Status.COMING);
        List<Notification> notifications = new ArrayList<>();

        for (Auction auction : remindingAuctions) {
//            System.out.println("start time : ========= " + auction.getStartDate());
            List<User> users = userRepository.findByRole(UserRole.STAFF);
            String msg = "Auction id: " + auction.getId() + " About to start at "
                    + auction.getStartDate() + " , please check !!!";
            if (users.size() >0){
                for (User user : users){
                    if(notificationRepository.existsByMsgAndUser_Id(msg, user.getId())){

                    }else {
                        Notification notification = Notification
                                .builder()
                                .title("Remind auction start")
                                .msg(msg)
                                .user(user)
                                .build();
                        notifications.add(notification);
                    }

                }
            }

            List<Bid> bids = bidRepository.findByAuction_Id(auction.getId());
            if (bids.size() >0){
                for (Bid bid : bids){
                    if(notificationRepository.existsByMsgAndUser_Id(msg, bid.getUser().getId())){

                    }else {
                        Notification notification = Notification
                                .builder()
                                .title("Remind auction start")
                                .msg(msg)
                                .user(bid.getUser())
                                .build();
                        notifications.add(notification);
                    }

                }
            }

            auctionContainer.removeAuctionRemind(auction);


        }
        notificationRepository.saveAll(notifications);

        for (Auction auction : pendingAuctions) {
//            System.out.println("start time : ========= " + auction.getStartDate());

            auctionContainer.removeOnAuctionListById(auction.getId());
            auctionContainer.removeOnStatusLists(auction);

            auction.setModifiedBy("System");
            auction.setStatus(Status.LIVE);
            auctionRepository.save(auction);

            auction = auctionRepository.findById(auction.getId()).get();
            auctionContainer.addAuction(auction);

            /*AuctionDetailResponse response = auctionMapper.toResponseDetail(auction);
            firebaseAuctionService.savev2(response,response.getId(),COLLECTION_AUCTION);*/
        }

    }


    private List<Auction> getPendingAuctionsStartingAfter(LocalDateTime startTime, Status status) {
        return auctionContainer.getComingAuctions().stream()
                .filter(auction -> startTime.isAfter(auction.getStartDate()) && auction.getStatus() == status)
                .collect(Collectors.toList());
    }

    private List<Auction> getAuctionsRemindingAfter(LocalDateTime startTime, Status status) {
        return auctionContainer.getRemindAuctions().stream()
                .filter(auction -> startTime.isAfter(auction.getRemindAt()))
                .collect(Collectors.toList());
    }

    @Scheduled(fixedRate = 1000) // Run every 1 minute
    public void checkAuctionExpired() throws DataNotFoundException {
        LocalDateTime currentTime = convertCurrentToLocalDateTimeWithZone();
        List<Auction> expiredAuctions = getWaitingAuctionsStartingAt(currentTime, Status.WAITING);

        for (Auction auction : expiredAuctions) {

            auction.setModifiedBy("System");
            auction.setStatus(Status.END);
            auction.setRejected(true);
            auction.setRejectReason("The auction is past the approval deadline");
            Product product = productRepository.findById(auction.getProduct().getId())
                    .orElseThrow(() ->
                            new DataNotFoundException(
                                    "Cannot find product with name: " + auction.getProduct().getId()));

            int updatedProductQuantity = product.getQuantity() + auction.getQuantity();
            product.setQuantity(updatedProductQuantity);
            productRepository.save(product);
            auctionContainer.removeAuctionFromList(auction, Status.WAITING);
            auctionContainer.removeOnAuctionListById(auction.getId());

            auctionRepository.save(auction);
        }
    }

    private List<Auction> getWaitingAuctionsStartingAt(LocalDateTime startTime, Status status) {

        return auctionContainer.getWaitingAuctions().stream()
                .filter(auction -> startTime.isAfter(auction.getStartDate()) && auction.getStatus() == status)
                .collect(Collectors.toList());
    }

//    @Scheduled(fixedRate = 1000) // Run every 1 minute
//    public void test() throws DataNotFoundException {
//        log.info("bibi");
//    }


}
