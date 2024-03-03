package org.jio.orchidbe.mappers.orders;

import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.responses.OrderResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface OrderMapper {

    @Mapping(source = "order.auction.id", target = "auctionID")
    OrderResponse toResponse(Order order);

    @Mapping(target = "user", ignore = true)

    Order toEntity(CreateOrderRequest createOrderRequest);
}
