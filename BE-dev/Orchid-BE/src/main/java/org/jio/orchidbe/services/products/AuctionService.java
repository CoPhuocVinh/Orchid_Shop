package org.jio.orchidbe.services.products;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.configs.AuctionConfig;


import org.jio.orchidbe.dtos.products.GetAllPoductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.mappers.auctions.AuctionMapper;
import org.jio.orchidbe.mappers.products.ProductMapper;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.jio.orchidbe.requests.CreateAuctionResquest;
import org.jio.orchidbe.requests.GetAllAuctionResquest;
import org.jio.orchidbe.requests.StatusUpdateRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class AuctionService implements IAuctionService {
    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private Properties properties;

    private final AuctionMapper auctionMapper;
    @Autowired
    private ProductRepository productRepository;



    @Override
    public AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException, BadRequestException {

        Auction auction1 = auctionMapper.toEntity(createAuctionResquest);
        validateBlank(createAuctionResquest);
        SimpleDateFormat sdf = new SimpleDateFormat(properties.getProperty("date"));
        Date startDate = sdf.parse(createAuctionResquest.getStartDate());
        Date endDate = sdf.parse(createAuctionResquest.getEndDate());
        validateDate(startDate,endDate);
        //map

        Product product = productRepository.findById(createAuctionResquest.getProduct())
                .orElseThrow(() ->
                new DataNotFoundException(
                        "Cannot find product with id: "+ createAuctionResquest.getProduct()));
        auction1.setProduct(product);
        auction1.setStatus(Status.COMING);
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
            //existingAuction.setUpdatedAt(LocalDateTime.now());
        } else if (request.getStatus().equalsIgnoreCase(Status.END.name())) {
            existingAuction.setStatus(Status.END);
            existingAuction.setModifiedBy(request.getBy());
            //existingAuction.setUpdatedAt(LocalDateTime.now());
        } else if (request.getStatus().equalsIgnoreCase(Status.LIVE.name())) {
            existingAuction.setStatus(Status.LIVE);
            existingAuction.setModifiedBy(request.getBy());
            //existingAuction.setUpdatedAt(LocalDateTime.now());
        }
        auctionRepository.save(existingAuction);
        return auctionMapper.toResponse(existingAuction);
    }


    public void validateDate(Date startDate, Date endDate) throws BadRequestException {
        if (endDate.before(startDate)) {
            throw new BadRequestException("Time Exception!!!");
        }
    }

    public void validateBlank(CreateAuctionResquest request) {
        if (request.getDepositPrice() == null || request.getDepositPrice() < 0) {
            throw new IllegalArgumentException("Deposit error!!");
        }
        if (request.getProductCode() == null || request.getProductCode().isEmpty()) {
            throw new IllegalArgumentException("Product Code cannot be blank");
        }
        if (request.getProductName() == null || request.getProductName().isEmpty()) {
            throw new IllegalArgumentException("Product Name cannot be blank");
        }
        if (request.getStartPrice() == null || request.getStartPrice()< 0) {
            throw new IllegalArgumentException("Start Price error");
        }
        if (request.getQuantity() == null || request.getQuantity()<= 0) {
            throw new IllegalArgumentException("Quantity error");
        }
        if (request.getStartDate() == null || request.getStartDate().isEmpty()) {
            throw new IllegalArgumentException("Start Date cannot be blank");
        }
        if (request.getEndDate() == null || request.getEndDate().isEmpty()) {
            throw new IllegalArgumentException("End Date cannot be blank");
        }
        if (request.getRemindAt() == null || request.getRemindAt().isEmpty()) {
            throw new IllegalArgumentException("RemindAt cannot be blank");
        }
    }


}
