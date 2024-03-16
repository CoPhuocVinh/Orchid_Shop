package org.jio.orchidbe.controller.auctions;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.bids.CreateBidRequest;
import org.jio.orchidbe.requests.bids.GetAllBidRequest;
import org.jio.orchidbe.responses.BiddingResponse;
import org.jio.orchidbe.services.auctions.IBidService;
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

    @PostMapping("bid")
    public ResponseEntity<?> bidding(
            @Valid @RequestBody CreateBidRequest createBidRequest,
            BindingResult result
    ) throws DataNotFoundException, BadRequestException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        BiddingResponse newBid = bidService.Bidding(createBidRequest);

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

//    @PutMapping("update-bid/{id}")
//    public ResponseEntity updateBid(@PathVariable("id") Long id,
//                                      @RequestBody UpdateBiddingRequest updateBiddingRequest,
//                                      BindingResult bindingResult) throws ChangeSetPersister.NotFoundException{
//
//        return bidService.updateBidding(updateBiddingRequest, id, bindingResult);
//
//    }

//    @DeleteMapping("/{id}")
//    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
//    public ResponseEntity<?> DeleteById(@PathVariable Long id) throws DataNotFoundException {
//        ApiResponse apiResponse = new ApiResponse();
//        BiddingResponse response = bidService.deleteBidding(id);
//        apiResponse.ok(response);
//        apiResponse.setMessage("Delete successfully with auction id: " + id);
//        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
//    }
//    @PostMapping("isTop1")
//    public ResponseEntity<?> isTop1Bidding(
//            @Valid @RequestBody Long id,
//            BindingResult result
//    ) throws DataNotFoundException {
//        ApiResponse apiResponse = new ApiResponse();
//        if (result.hasErrors()) {
//            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
//            return ResponseEntity.badRequest().body(apiResponse);
//        }
//
//        BiddingResponse newBidding = bidService.isTop1(id);
//
//        apiResponse.ok(newBidding);
//        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
//    }


}
