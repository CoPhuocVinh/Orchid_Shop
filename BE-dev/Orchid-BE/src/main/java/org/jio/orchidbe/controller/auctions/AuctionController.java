package org.jio.orchidbe.controller.auctions;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.dtos.products.ProductDetailDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.mappers.auctions.AuctionMapper;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.auctions.*;
import org.jio.orchidbe.responses.AuctionContainer;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.services.products.IAuctionService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("${api.prefix}/auctions")
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionContainer auctionContainer;
    private final IAuctionService auctionService;
    private final ValidatorUtil validatorUtil;
    private final AuctionRepository auctionRepository;
    private final AuctionMapper auctionMapper;
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





    @PutMapping("update-auction/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })

    public ResponseEntity updateAuction(@PathVariable("id") Long id,
                                        @RequestBody UpdateAuctionRequest updateAuctionRequest,
                                        BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, BadRequestException, DataNotFoundException {

            return auctionService.updateAuction(updateAuctionRequest, id, bindingResult);

    }

    @GetMapping("list")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })

    public ResponseEntity<?> getAuction(@ModelAttribute GetAllAuctionResquest getAllAuctionResquest){
        ApiResponse apiResponse = new ApiResponse();

        Page<AuctionResponse> auctionPage = auctionService.getAllAuctions(getAllAuctionResquest);
        apiResponse.ok(auctionPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/auctions/waiting")
    public List<AuctionResponse> getWaitingAuctions() {
        // Lấy danh sách các phiên đấu giá có trạng thái WAITING từ AuctionContainer
        List<Auction> waitingAuctions = auctionContainer.getWaitingAuctions();
        // Chuyển đổi danh sách các phiên đấu giá thành danh sách các phản hồi
        return auctionMapper.toResponseList(waitingAuctions);
    }

    @GetMapping("/auctions/coming")
    public List<AuctionResponse> getComingAuctions() {
        // Lấy danh sách các phiên đấu giá có trạng thái COMING từ AuctionContainer
        List<Auction> comingAuctions = auctionContainer.getComingAuctions();
        // Chuyển đổi danh sách các phiên đấu giá thành danh sách các phản hồi
        return auctionMapper.toResponseList(comingAuctions);
    }

    @GetMapping("/auctions/live")
    public List<AuctionResponse> getLiveAuctions() {
        // Lấy danh sách các phiên đấu giá có trạng thái LIVE từ AuctionContainer
        List<Auction> liveAuctions = auctionContainer.getLiveAuctions();
        // Chuyển đổi danh sách các phiên đấu giá thành danh sách các phản hồi
        return auctionMapper.toResponseList(liveAuctions);
    }

    @GetMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> findAuctionById(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        AuctionResponse response = auctionService.getById(id);
        apiResponse.ok(response);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> DeleteById(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        AuctionResponse response = auctionService.DeteleById(id);
        apiResponse.ok(response);
        apiResponse.setMessage("Delete successfully with auction id: " + id);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }




}
