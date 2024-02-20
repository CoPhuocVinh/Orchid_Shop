package org.jio.orchidbe.services.products;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
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



    public static LocalDateTime convertToLocalDateTime(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }


    @Override
    public AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException {

        Auction auction1 = auctionMapper.toEntity(createAuctionResquest);
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


}
