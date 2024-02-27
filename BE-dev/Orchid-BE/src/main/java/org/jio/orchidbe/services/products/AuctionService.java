package org.jio.orchidbe.services.products;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.auctions.*;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.dao.DataIntegrityViolationException;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.models.auctions.Auction;

import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.mappers.auctions.AuctionMapper;

import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Optional;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class AuctionService implements IAuctionService {
    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private ValidatorUtil validatorUtil;

    private final AuctionMapper auctionMapper;
    @Autowired
    private ProductRepository productRepository;



    @Override
    public AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException, BadRequestException {
        Auction auction1 = auctionMapper.toEntity(createAuctionResquest);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");
        LocalDateTime endDate = LocalDateTime.parse(createAuctionResquest.getEndDate(), formatter);
        LocalDateTime startDate = LocalDateTime.parse(createAuctionResquest.getStartDate(), formatter);
        validateDate(startDate,endDate);
        //map
        Product product = productRepository.findById(createAuctionResquest.getProductID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: " + createAuctionResquest.getProductID()));

        // Kiểm tra số lượng của phiên đấu giá
        if (createAuctionResquest.getQuantity() > product.getQuantity()) {
            throw new BadRequestException("Quantity of auction must be less than or equal to product quantity.");
        }

        // Cập nhật số lượng mới của sản phẩm
        int updatedProductQuantity = product.getQuantity() - createAuctionResquest.getQuantity();
        product.setQuantity(updatedProductQuantity);
        productRepository.save(product);

        auction1.setProductCode(product.getProductCode());
        auction1.setProductName(product.getProductName());
        auction1.setStatus(Status.WAITING);
        auctionRepository.save(auction1);

        return auctionMapper.toResponse(auction1);
    }



    @Override
    public Page<AuctionResponse> getAllAuctions(GetAllAuctionResquest request) {
        return auctionRepository.findAll(request.getSpecification(), request.getPageable())
                .map(auctionMapper::toResponse);
    }


    @Override
    public AuctionResponse UpdateStatus(StatusUpdateRequest request) {
        Optional<Auction> existingAuctionO = auctionRepository.findById(request.getId());
        Auction existingAuction = existingAuctionO.get();

        if (request.getStatus().equalsIgnoreCase(Status.COMING.name())) {
            existingAuction.setStatus(Status.COMING);
            existingAuction.setModifiedBy(request.getBy());
        } else if (request.getStatus().equalsIgnoreCase(Status.END.name())) {
            existingAuction.setStatus(Status.END);
            existingAuction.setModifiedBy(request.getBy());
        } else if (request.getStatus().equalsIgnoreCase(Status.LIVE.name())) {
            existingAuction.setStatus(Status.LIVE);
            existingAuction.setModifiedBy(request.getBy());
        } else if (request.getStatus().equalsIgnoreCase(Status.APPROVE.name())) {
            existingAuction.setStatus(Status.APPROVE);
            existingAuction.setModifiedBy(request.getBy());
        }
        auctionRepository.save(existingAuction);
        return auctionMapper.toResponse(existingAuction);
    }


    @Override
    @Transactional
    public ResponseEntity updateAuction(UpdateAuctionRequest updateAuctionRequest, Long id,
                                        BindingResult bindingResult) throws ChangeSetPersister.NotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        final Auction auction = auctionRepository.findById(id).orElseThrow(
                () -> new ChangeSetPersister.NotFoundException()
        );

        try {
            // đổ data theo field
//            validateAuction(updateAuctionRequest.getProductName());
            ReflectionUtils.doWithFields(updateAuctionRequest.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(updateAuctionRequest);
                if (newValue != null) { // lấy các giá trị không null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(auction.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, auction, newValue);
                    }
                }
            });

            Auction updatedAuction = auctionRepository.save(auction);

            AuctionResponse auctionResponse = auctionMapper.toResponse(updatedAuction);
            apiResponse.ok(auctionResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (OptimisticLockingFailureException ex) {
            throw new OptimisticException("Data is updated by another user!");
        } catch (DataIntegrityViolationException e) {
            if (bindingResult.hasErrors()) {
                apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
                return ResponseEntity.badRequest().body(apiResponse);
            }
            throw new DataIntegrityViolationException("Contract data");
        }
    }


//    public void validateAuction(String productName) throws BadRequestException {
//        if (auctionRepository.existsAuctionByProductName(productName)) {
//            throw new BadRequestException("Auction with " + productName + " is existed");
//        }
//    }


    @Override
    public AuctionResponse deleteAuction(Request request) throws DataNotFoundException {
        Optional<Auction> aution = auctionRepository.findById(request.getId());
        Auction existingAuction = aution.orElseThrow(() -> new DataNotFoundException("Auction not found with id: " + request.getId()));
        existingAuction.setDeleted(true);
        existingAuction.setModifiedBy(request.getBy());
        Auction updatedAuction = auctionRepository.save(existingAuction);
        return auctionMapper.toResponse(updatedAuction);
    }

    @Override
    public AuctionResponse rejectAuction(RejectAuctionRequest request) throws DataNotFoundException {
        Optional<Auction> existingAuctionO = auctionRepository.findById(request.getId());
        Auction existingAuction = existingAuctionO.get();
        existingAuction.setStatus(Status.REJECT);
        existingAuction.setModifiedBy(request.getBy());
        existingAuction.setRejectReason(request.getReason());
        auctionRepository.save(existingAuction);
        return auctionMapper.toResponse(existingAuction);
    }

    public void validateDate(LocalDateTime startDate, LocalDateTime endDate) throws BadRequestException {
        if (endDate.isBefore(startDate)) {
            throw new BadRequestException("End date cannot be before start date!");
        }
    }



}
