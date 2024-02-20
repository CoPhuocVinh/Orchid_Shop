package org.jio.orchidbe.services.products;

import org.jio.orchidbe.requests.CreateAuctionResquest;
import org.jio.orchidbe.responses.AuctionResponse;

import java.text.ParseException;

public interface IAuctionService {
    void createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException;
}
