package org.jio.orchidbe.responses;

import org.jio.orchidbe.models.auctions.Auction;

import java.util.ArrayList;
import java.util.List;

public class AuctionContainer {
    private List<Auction> auctions;

    public AuctionContainer() {
        this.auctions = new ArrayList<>();
    }

    public void addAuction(Auction auction) {
        auctions.add(auction);
    }

    public List<Auction> getAuctions() {
        return auctions;
    }

    public void setAuctions(List<Auction> auctions) {
        this.auctions = auctions;
    }
}
