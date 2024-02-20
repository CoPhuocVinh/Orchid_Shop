package org.jio.orchidbe.mappers.auctions;

import org.jio.orchidbe.dtos.products.ProductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.requests.CreateAuctionResquest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface AuctionMapper {

    AuctionResponse toResponse(Auction auction);

    @Mapping(target = "product", ignore = true)
    Auction toEntity(CreateAuctionResquest createAuctionResquest);
}

