package org.jio.orchidbe.mappers.orders;

import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.OrderResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
@Component
public interface OrderMapper {


    @Mapping(source = "order.user.id", target = "userID")
    @Mapping(source = "order.auction.id", target = "auctionID")
    OrderResponse toResponse(Order order);

    @Mapping(target = "user", ignore = true)
    @Mapping(target = "auction", ignore = true)
    Order toEntity(CreateOrderRequest createOrderRequest);

    List<OrderResponse> toResponseList(List<Order> orders);
}
