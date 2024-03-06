package org.jio.orchidbe.services.schedules;

import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.responses.AuctionContainer;
import org.jio.orchidbe.services.products.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class Schedule {
    @Autowired
    private AuctionContainer auctionContainer;
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private AuctionService auctionService;


//    @Scheduled(fixedDelay = 10000) // Kiểm tra mỗi 60 giây
//    public void checkAuctionEndings() throws DataNotFoundException {
//        LocalDateTime currentTime = LocalDateTime.now();
//        List<Auction> auctions = getAuctionsEndingBefore(currentTime, Status.LIVE);
//
//        for (Auction auction : auctions) {
//            // Truyền số lượng vào phương thức endAuction
//            auctionService.endAuction(auction.getId(), auction.getQuantity());
//        }
//    }
    private List<Auction> getAuctionsEndingBefore(LocalDateTime endTime, Status status) {
        return auctionContainer.getLiveAuctions().stream()
                .filter(auction -> auction.getEndDate().isBefore(endTime) && auction.getStatus() == status)
                .collect(Collectors.toList());
    }

    @Scheduled(fixedRate = 10000) // Run every 1 minute
    public void checkAuctionStatus() {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Auction> pendingAuctions = getPendingAuctionsStartingAfter(currentTime, Status.COMING);

        for (Auction auction : pendingAuctions) {
            auction.setStatus(Status.LIVE);
            auctionContainer.removeAuctionFromList(auction, Status.COMING);
            auctionContainer.moveAuctionToList(auction, Status.LIVE);
            auctionRepository.save(auction);
        }
    }


    private List<Auction> getPendingAuctionsStartingAfter(LocalDateTime startTime, Status status) {
        return auctionContainer.getComingAuctions().stream()
                .filter(auction -> auction.getStartDate().isEqual(startTime) && auction.getStatus() == status)
                .collect(Collectors.toList());
    }

    @Scheduled(fixedRate = 1000) // Run every 1 minute
    public void checkAuctionExpired() throws DataNotFoundException {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Auction> expiredAuctions = getWaitingAuctionsStartingAt(currentTime, Status.WAITING);

        for (Auction auction : expiredAuctions) {
            auction.setStatus(Status.END);
            auction.setRejected(true);
            auction.setRejectReason("The auction is past the approval deadline");
            auctionContainer.removeAuctionFromList(auction, Status.WAITING);
            auctionContainer.removeOnAuctionListById(auction.getId());

            auctionRepository.save(auction);
        }
    }

    private List<Auction> getWaitingAuctionsStartingAt(LocalDateTime startTime, Status status) {
        return auctionContainer.getWaitingAuctions().stream()
                .filter(auction -> auction.getStartDate().isEqual(startTime) && auction.getStatus() == status)
                .collect(Collectors.toList());
    }
}
