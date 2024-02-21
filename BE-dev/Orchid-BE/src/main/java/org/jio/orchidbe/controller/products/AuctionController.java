package org.jio.orchidbe.controller.products;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.CreateAuctionResquest;
import org.jio.orchidbe.requests.GetAllAuctionResquest;
import org.jio.orchidbe.requests.StatusUpdateRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.services.products.IAuctionService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("${api.prefix}/auctions")
@RequiredArgsConstructor
public class AuctionController {

    private final IAuctionService auctionService;
    private final ValidatorUtil validatorUtil;
    @PostMapping("create")
    public ResponseEntity<?> createAuction(
            @Valid @RequestBody CreateAuctionResquest createAuctionResquest,
            BindingResult result
    ) throws DataNotFoundException, ParseException, BadRequestException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        AuctionResponse newAuction = auctionService.createAuction(createAuctionResquest);

        apiResponse.ok(newAuction);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping("update")
    public ResponseEntity<?> updateStatusAuction(
            @Valid @RequestBody StatusUpdateRequest statusUpdateRequest,
            BindingResult result
    )  {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        AuctionResponse newAuction = auctionService.UpdateStatus(statusUpdateRequest);

        apiResponse.ok(newAuction);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("list")
    public ResponseEntity<?> getAuction(@ModelAttribute GetAllAuctionResquest getAllAuctionResquest){
        ApiResponse apiResponse = new ApiResponse();

        Page<AuctionResponse> auctionPage = auctionService.getAllAuctions(getAllAuctionResquest);
        apiResponse.ok(auctionPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
