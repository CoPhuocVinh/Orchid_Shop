package org.jio.orchidbe.services.orders;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.orders.*;
import org.jio.orchidbe.responses.OrderResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface IOrderService {
//    OrderResponse createOrder(CreateOrderRequest createOrderRequest) throws DataNotFoundException, BadRequestException;
    Page<OrderResponse> getAllOrders(GetAllOrderRequest getAllOrderRequest);
    OrderResponse deleteOrder(Long id) throws DataNotFoundException;
    @Transactional
    ResponseEntity updateOrder(UpdateOrderRequest updateOrderRequest, Long id,
                               BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, DataNotFoundException, BadRequestException;

    @Transactional
    OrderResponse confirmedOrder(Long id, ConfirmedOrderRequest confirmedOrderRequest, BindingResult result) throws DataNotFoundException;

    OrderResponse UpdateOrderStatus(StatusOrderRequest request) ;

    OrderResponse getById(Long id) throws DataNotFoundException;
}
