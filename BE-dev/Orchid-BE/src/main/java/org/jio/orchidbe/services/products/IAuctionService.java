package org.jio.orchidbe.services.products;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.*;
import org.jio.orchidbe.responses.AuctionResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.text.ParseException;

public interface IAuctionService {
    AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException, BadRequestException;
    Page<AuctionResponse> getAllAuctions(GetAllAuctionResquest getAllAuctionResquest);
    AuctionResponse UpdateStatus(StatusUpdateRequest request) ;

    @Transactional
    ResponseEntity updateAuction(UpdateAuctionRequest updateAuctionRequest, Long id,
                                 BindingResult bindingResult) throws ChangeSetPersister.NotFoundException;

    AuctionResponse deleteAuction(AuctionRequest request) throws DataNotFoundException;
    AuctionResponse rejectAuction(RejectAuctionRequest request) throws DataNotFoundException;
}
