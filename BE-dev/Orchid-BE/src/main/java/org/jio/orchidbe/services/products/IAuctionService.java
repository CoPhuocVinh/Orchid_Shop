package org.jio.orchidbe.services.products;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.products.GetAllPoductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.CreateAuctionResquest;
import org.jio.orchidbe.requests.GetAllAuctionResquest;
import org.jio.orchidbe.requests.StatusUpdateRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.springframework.data.domain.Page;

import java.text.ParseException;

public interface IAuctionService {
    AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException, BadRequestException;
    Page<AuctionResponse> getAllAuctions(GetAllAuctionResquest getAllAuctionResquest);
    AuctionResponse UpdateStatus(StatusUpdateRequest request) ;
}
