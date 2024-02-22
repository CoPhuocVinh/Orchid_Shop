package org.jio.orchidbe.services.products;

import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.auctions.CreateAuctionResquest;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.OrderResponse;

public interface IOrderService {
    OrderResponse createOrder(CreateOrderRequest createOrderRequest) throws DataNotFoundException;
}
