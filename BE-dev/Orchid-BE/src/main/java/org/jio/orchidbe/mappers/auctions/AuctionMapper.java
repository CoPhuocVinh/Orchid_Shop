package org.jio.orchidbe.mappers.auctions;

import org.jio.orchidbe.dtos.users.UserDTORequest;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.requests.auctions.CreateAuctionResquest;
import org.jio.orchidbe.requests.auctions.UpdateAuctionRequest;
import org.jio.orchidbe.responses.AuctionDetailResponse;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.GetAuctionResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface AuctionMapper {
    //@Mapping(source = "isReject", target = "isReject")
    @Mapping(source = "auction.product.id", target = "productID")
    AuctionResponse toResponse(Auction auction);

    @Mapping(source = "auction.product.id", target = "productID")

    GetAuctionResponse toAllResponse(Auction auction);

    Auction toEntity(UpdateAuctionRequest request);
    AuctionDetailResponse toResponseDetail(Auction auction);


    @Mapping(target = "product", ignore = true)
    Auction toEntity(CreateAuctionResquest createAuctionResquest);
    List<AuctionResponse> toResponseList(List<Auction> auctions);


}

