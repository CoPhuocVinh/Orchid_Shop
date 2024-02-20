package org.jio.orchidbe.mappers.auctions;

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

    @Mapping(target = "product", source = "createAuctionResquest.product")
    Auction toEntity(CreateAuctionResquest createAuctionResquest);

    Product map(String product); // This method converts String to Product
}
