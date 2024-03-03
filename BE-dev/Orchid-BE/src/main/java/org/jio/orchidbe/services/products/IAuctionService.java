package org.jio.orchidbe.services.products;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.auctions.*;
import org.jio.orchidbe.responses.AuctionResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.text.ParseException;
import java.util.List;

public interface IAuctionService {
    AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException, BadRequestException;
    Page<AuctionResponse> getAllAuctions(GetAllAuctionResquest getAllAuctionResquest);
    List<AuctionResponse> getAllAuctionsFromContainer();

    void endAuction(long auctionID,int quantity) throws DataNotFoundException;

    @Transactional
    ResponseEntity updateAuction(UpdateAuctionRequest updateAuctionRequest, Long id,
                                 BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, DataNotFoundException;

    AuctionResponse deleteAuction(Long id) throws DataNotFoundException;

    AuctionResponse getById(Long id) throws DataNotFoundException;
}
