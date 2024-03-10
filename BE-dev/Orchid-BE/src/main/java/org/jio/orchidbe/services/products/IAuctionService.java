package org.jio.orchidbe.services.products;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.auctions.RegisterAuctionDTO;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.auctions.*;
import org.jio.orchidbe.responses.AuctionDetailResponse;
import org.jio.orchidbe.responses.AuctionResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.text.ParseException;

public interface IAuctionService {
    AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException, BadRequestException;
    Page<AuctionResponse> getAllAuctions(GetAllAuctionResquest getAllAuctionResquest);

    void endAuction(long auctionID,int quantity) throws DataNotFoundException;

    AuctionResponse DeteleById(Long id) throws DataNotFoundException;

    @Transactional
    ResponseEntity updateAuction(UpdateAuctionRequest updateAuctionRequest, Long id,
                                 BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, DataNotFoundException;

    AuctionResponse deleteAuction(Long id) throws DataNotFoundException;

    AuctionDetailResponse getById(Long id) throws DataNotFoundException;

    Boolean registerAuction(Long id, RegisterAuctionDTO dto) throws DataNotFoundException, BadRequestException;
}
