package org.jio.orchidbe.responses;

import org.jio.orchidbe.models.auctions.Auction;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Configuration
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