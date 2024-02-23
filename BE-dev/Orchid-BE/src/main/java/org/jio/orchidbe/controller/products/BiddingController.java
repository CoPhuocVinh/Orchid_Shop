package org.jio.orchidbe.controller.products;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.bids.CreateBidRequest;
import org.jio.orchidbe.requests.bids.GetAllBidRequest;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.requests.orders.GetAllOrderRequest;
import org.jio.orchidbe.responses.BiddingResponse;
import org.jio.orchidbe.responses.OrderResponse;
import org.jio.orchidbe.services.products.IBidService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/biddings")
@RequiredArgsConstructor
public class BiddingController {
    private final IBidService bidService;
    private final ValidatorUtil validatorUtil;

    @PostMapping("create")
    public ResponseEntity<?> createBidding(
            @Valid @RequestBody CreateBidRequest createBidRequest,
            BindingResult result
    ) throws DataNotFoundException, BadRequestException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        BiddingResponse newBid = bidService.createBid(createBidRequest);

        apiResponse.ok(newBid);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("list")
    public ResponseEntity<?> getBidding(@ModelAttribute GetAllBidRequest getAllBidRequest){
        ApiResponse apiResponse = new ApiResponse();

        Page<BiddingResponse> biddingPage = bidService.getAllBids(getAllBidRequest);
        apiResponse.ok(biddingPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }


}
