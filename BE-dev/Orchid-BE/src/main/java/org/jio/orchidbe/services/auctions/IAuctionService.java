package org.jio.orchidbe.services.auctions;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.auctions.RegisterAuctionDTO;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.requests.auctions.*;
import org.jio.orchidbe.responses.AuctionDetailResponse;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.GetAuctionResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

import java.text.ParseException;
import java.util.concurrent.ExecutionException;

public interface IAuctionService {
    AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException, BadRequestException, ExecutionException, InterruptedException;
    Page<GetAuctionResponse> getAllAuctions(GetAllAuctionResquest getAllAuctionResquest);

    void endAuction(Auction auction) throws DataNotFoundException, ExecutionException, InterruptedException;

    AuctionResponse DeteleById(Long id) throws DataNotFoundException;

    @Transactional
    ResponseEntity updateAuction(UpdateAuctionRequest updateAuctionRequest, Long id,
                                 BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, DataNotFoundException, BadRequestException;


    AuctionDetailResponse getById(Long id) throws DataNotFoundException, ExecutionException, InterruptedException;

    Boolean registerAuction(Long id, RegisterAuctionDTO dto) throws DataNotFoundException, BadRequestException;
}
