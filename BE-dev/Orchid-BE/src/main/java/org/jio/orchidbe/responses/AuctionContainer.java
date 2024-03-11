package org.jio.orchidbe.responses;

import org.jio.orchidbe.exceptions.DataNotFoundException;
import  org.jio.orchidbe.enums.Status;
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

    public Auction getAuctionById(Long id) throws DataNotFoundException {
        for (Auction auction : auctions) {
            if (auction.getId().equals(id)) {
                return auction;
            }
        }
        throw new DataNotFoundException(
                "Cannot find auction with id: " + id);
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
        throw new DataNotFoundException(
                "Cannot find auction with id: " + id);
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
