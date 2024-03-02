package org.jio.orchidbe.responses;

import org.jio.orchidbe.models.auctions.Auction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Configuration
public class AuctionContainer {
    private List<Auction> auctions;
    private List<Auction> waitingAuctions;
    private List<Auction> comingAuctions;
    private List<Auction> liveAuctions;

    public AuctionContainer() {
        this.auctions = new ArrayList<>();
        this.waitingAuctions = new ArrayList<>();
        this.comingAuctions = new ArrayList<>();
        this.liveAuctions = new ArrayList<>();
    }

    public void addAuction(Auction auction) {
        auctions.add(auction);
        updateAuctionLists(auction);
    }

    private void updateAuctionLists(Auction auction) {
        switch (auction.getStatus()) {
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

    public void setAuctions(List<Auction> auctions) {
        this.auctions = auctions;
        // Clear existing lists
        waitingAuctions.clear();
        comingAuctions.clear();
        liveAuctions.clear();
        // Rebuild lists
        for (Auction auction : auctions) {
            updateAuctionLists(auction);
        }
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
