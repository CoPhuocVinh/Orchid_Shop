package org.jio.orchidbe.controller.auctions;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.constants.BaseConstants;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.auctions.RegisterAuctionDTO;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.repositorys.auctions.AuctionRepository;
import org.jio.orchidbe.requests.StatusDTOResquest;
import org.jio.orchidbe.requests.auctions.*;
import org.jio.orchidbe.container.AuctionContainer;
import org.jio.orchidbe.responses.AuctionDetailResponse;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.GetAuctionResponse;
import org.jio.orchidbe.services.auctions.IAuctionService;
import org.jio.orchidbe.services.firebase.IFirebaseService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("${api.prefix}/auctions")
@RequiredArgsConstructor
public class AuctionController {
    private final AuctionRepository auctionRepository;
    private final IAuctionService auctionService;
    private final ValidatorUtil validatorUtil;
    private final IFirebaseService firebaseService;

    @PostMapping("/count")
    public Long countAuctionsByStatus(@RequestBody(required = false) StatusDTOResquest auctionStatusDTO) {
        if (auctionStatusDTO == null || auctionStatusDTO.getStatus() == null) {
            // Trường hợp không có trạng thái được cung cấp, đếm toàn bộ phiên đấu giá
            return auctionRepository.count();
        } else {
            // Trường hợp có trạng thái được cung cấp, đếm theo trạng thái
            try {
                return auctionRepository.countByStatus(auctionStatusDTO.getStatus());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid status provided");
            }
        }
    }


    @PostMapping("create")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })

    public ResponseEntity<?> createAuction(
            @Valid @RequestBody CreateAuctionResquest createAuctionResquest,
            BindingResult result
    ) throws DataNotFoundException, ParseException, BadRequestException, ExecutionException, InterruptedException {
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

        Page<GetAuctionResponse> auctionPage = auctionService.getAllAuctions(getAllAuctionResquest);
        apiResponse.ok(auctionPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

//    @GetMapping("/auctions/waiting")
//    public List<AuctionResponse> getWaitingAuctions() {
//        // Lấy danh sách các phiên đấu giá có trạng thái WAITING từ AuctionContainer
//        List<Auction> waitingAuctions = auctionContainer.getWaitingAuctions();
//        // Chuyển đổi danh sách các phiên đấu giá thành danh sách các phản hồi
//        return auctionMapper.toResponseList(waitingAuctions);
//    }

//    @GetMapping("/auctions/coming")
//    public List<AuctionResponse> getComingAuctions() {
//        // Lấy danh sách các phiên đấu giá có trạng thái COMING từ AuctionContainer
//        List<Auction> comingAuctions = auctionContainer.getComingAuctions();
//        // Chuyển đổi danh sách các phiên đấu giá thành danh sách các phản hồi
//        return auctionMapper.toResponseList(comingAuctions);
//    }
//
//    @GetMapping("/auctions/live")
//    public List<AuctionResponse> getLiveAuctions() {
//        // Lấy danh sách các phiên đấu giá có trạng thái LIVE từ AuctionContainer
//        List<Auction> liveAuctions = auctionContainer.getLiveAuctions();
//        // Chuyển đổi danh sách các phiên đấu giá thành danh sách các phản hồi
//        return auctionMapper.toResponseList(liveAuctions);
//    }

    @GetMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> findAuctionById(@PathVariable Long id) throws DataNotFoundException, ExecutionException, InterruptedException {
        ApiResponse apiResponse = new ApiResponse();
        AuctionDetailResponse response = auctionService.getById(id);
        apiResponse.ok(response);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/realtime/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> findAuctionByIdRealtime(@PathVariable Long id) throws DataNotFoundException, ExecutionException, InterruptedException {
        ApiResponse apiResponse = new ApiResponse();
        String key = String.valueOf(id);
        AuctionDetailResponse response = firebaseService.getAuctionByKey(key, BaseConstants.COLLECTION_AUCTION);
        apiResponse.ok(response);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping("/realtime/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> DeleteByIdRealtime(@PathVariable Long id) throws DataNotFoundException, ExecutionException, InterruptedException {
        ApiResponse apiResponse = new ApiResponse();
        String key = String.valueOf(id);
        Boolean response = firebaseService.delete(key, BaseConstants.COLLECTION_AUCTION);
        apiResponse.ok(response);
        apiResponse.setMessage("Delete successfully with auction id: " + id);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/realtime/getLiveAuctions")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> GetLiveRealtimeAuctions() throws DataNotFoundException, ExecutionException, InterruptedException {
        ApiResponse apiResponse = new ApiResponse();

        List<AuctionDetailResponse> response = firebaseService.getAuctions(BaseConstants.COLLECTION_AUCTION);
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

    // register
    @PostMapping("/register-by-auctionId/{id}")
    public ResponseEntity<?> registerAuctionById(@PathVariable Long id,
        @Valid @RequestBody RegisterAuctionDTO dto) throws DataNotFoundException, BadRequestException {
        ApiResponse apiResponse = new ApiResponse();
        Boolean response = auctionService.registerAuction(id,dto);
        apiResponse.ok(response);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }




}
