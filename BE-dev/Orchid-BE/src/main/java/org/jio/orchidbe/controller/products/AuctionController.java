package org.jio.orchidbe.controller.products;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.products.ProductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.requests.CreateAuctionResquest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.services.products.IAuctionService;
import org.jio.orchidbe.services.products.IProductService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/auctions")
@RequiredArgsConstructor
public class AuctionController {

    private final IAuctionService auctionService;
    private final ValidatorUtil validatorUtil;



//    @PostMapping("/auctions")
//    public ResponseEntity<ApiResponse<AuctionResponse>> createAuction(@Valid @RequestBody CreateAuctionResquest createAuctionRequest) {
//        ApiResponse<AuctionResponse> response = new ApiResponse<>();
//
//        try {
//            AuctionResponse auctionResponse = auctionService.createAuction(createAuctionRequest);
//            response.ok(auctionResponse);
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            e.printStackTrace(); // You might want to log the exception for further analysis
//            response.error("An error occurred while creating the auction.");
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
//        }
//    }
}
