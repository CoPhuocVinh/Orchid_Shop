package org.jio.orchidbe.services.schedules;

import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.jio.orchidbe.responses.AuctionContainer;
import org.jio.orchidbe.services.auctions.IAuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleAuction {
    @Autowired
    private AuctionContainer auctionContainer;
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private IAuctionService auctionService;
    @Autowired
    private ProductRepository productRepository;


    @Scheduled(fixedDelay = 10000) // Kiểm tra mỗi 60 giây
    public void checkAuctionEndings() throws DataNotFoundException {
        LocalDateTime currentTime = LocalDateTime.now();
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

    @Scheduled(fixedRate = 10000) // Run every 1 minute
    public void checkAuctionStatus() throws DataNotFoundException {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Auction> pendingAuctions = getPendingAuctionsStartingAfter(currentTime, Status.COMING);
        List<Auction> remindingAuctions = getAuctionsRemindingAfter(currentTime, Status.COMING);



        for (Auction auction : pendingAuctions) {

            auctionContainer.removeOnAuctionListById(auction.getId());
            auctionContainer.removeOnStatusLists(auction);

            auction.setModifiedBy("System");
            auction.setStatus(Status.LIVE);
            auctionRepository.save(auction);

            auction = auctionRepository.findById(auction.getId()).get();
            auctionContainer.addAuction(auction);
        }

    }


    private List<Auction> getPendingAuctionsStartingAfter(LocalDateTime startTime, Status status) {
        return auctionContainer.getComingAuctions().stream()
                .filter(auction -> startTime.isAfter(auction.getStartDate()) && auction.getStatus() == status)
                .collect(Collectors.toList());
    }

    private List<Auction> getAuctionsRemindingAfter(LocalDateTime startTime, Status status) {
        return auctionContainer.getComingAuctions().stream()
                .filter(auction -> startTime.isAfter(auction.getRemindAt()))
                .collect(Collectors.toList());
    }

    @Scheduled(fixedRate = 1000) // Run every 1 minute
    public void checkAuctionExpired() throws DataNotFoundException {
        LocalDateTime currentTime = LocalDateTime.now();
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


}
