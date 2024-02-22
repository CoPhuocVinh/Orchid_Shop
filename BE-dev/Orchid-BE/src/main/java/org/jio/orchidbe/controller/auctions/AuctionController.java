package org.jio.orchidbe.controller.auctions;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.*;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.services.products.IAuctionService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("${api.prefix}/auctions")
@RequiredArgsConstructor
public class AuctionController {

    private final IAuctionService auctionService;
    private final ValidatorUtil validatorUtil;
    @PostMapping("create")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })

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

    @PostMapping("update-status")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })

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

    @PostMapping("reject-auction")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })

    public ResponseEntity<?> rejectStatusAuction(
            @Valid @RequestBody RejectAuctionRequest rejectAuctionRequest,
            BindingResult result
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        AuctionResponse newAuction = auctionService.rejectAuction(rejectAuctionRequest);

        apiResponse.ok(newAuction);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }


    @PutMapping("update-auction/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })

    public ResponseEntity updateAuction(@PathVariable("id") Long id,
                                        @RequestBody UpdateAuctionRequest updateAuctionRequest,
                                        BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, BadRequestException {

            return auctionService.updateAuction(updateAuctionRequest, id, bindingResult);

    }
    @PostMapping("delete-auction")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })

    public ResponseEntity<?> deleteAuction(
            @Valid @RequestBody AuctionRequest deleteAuctionRequest,
            BindingResult result
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        AuctionResponse newAuction = auctionService.deleteAuction(deleteAuctionRequest);

        apiResponse.ok(newAuction);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("list")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })

    public ResponseEntity<?> getAuction(@ModelAttribute GetAllAuctionResquest getAllAuctionResquest){
        ApiResponse apiResponse = new ApiResponse();

        Page<AuctionResponse> auctionPage = auctionService.getAllAuctions(getAllAuctionResquest);
        apiResponse.ok(auctionPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
