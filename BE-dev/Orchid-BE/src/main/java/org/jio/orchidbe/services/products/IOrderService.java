package org.jio.orchidbe.services.products;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.auctions.CreateAuctionResquest;
import org.jio.orchidbe.requests.auctions.GetAllAuctionResquest;
import org.jio.orchidbe.requests.auctions.StatusUpdateRequest;
import org.jio.orchidbe.requests.auctions.UpdateAuctionRequest;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.requests.orders.GetAllOrderRequest;
import org.jio.orchidbe.requests.orders.StatusOrderRequest;
import org.jio.orchidbe.requests.orders.UpdateOrderRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.OrderResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface IOrderService {
    //OrderResponse createOrder(CreateOrderRequest createOrderRequest) throws DataNotFoundException, BadRequestException;
    Page<OrderResponse> getAllOrders(GetAllOrderRequest getAllOrderRequest);
    OrderResponse deleteOrder(Request request) throws DataNotFoundException;
    @Transactional
    ResponseEntity updateOrder(UpdateOrderRequest updateOrderRequest, Long id,
                               BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, DataNotFoundException;

    OrderResponse UpdateOrderStatus(StatusOrderRequest request) ;
}
