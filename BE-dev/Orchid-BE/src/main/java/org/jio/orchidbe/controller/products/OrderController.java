package org.jio.orchidbe.controller.products;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.orders.GetAllOrderRequest;
import org.jio.orchidbe.requests.orders.StatusOrderRequest;
import org.jio.orchidbe.requests.orders.UpdateOrderRequest;
import org.jio.orchidbe.responses.OrderResponse;
import org.jio.orchidbe.services.products.IOrderService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {
    private final IOrderService orderService;
    private final ValidatorUtil validatorUtil;

//    @PostMapping("create")
//    public ResponseEntity<?> createOrder(
//            @Valid @RequestBody CreateOrderRequest createOrderRequest,
//            BindingResult result
//    ) throws DataNotFoundException, BadRequestException {
//        ApiResponse apiResponse = new ApiResponse();
//        if (result.hasErrors()) {
//            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
//            return ResponseEntity.badRequest().body(apiResponse);
//        }
//
//        OrderResponse newOrder = orderService.createOrder(createOrderRequest);
//
//        apiResponse.ok(newOrder);
//        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
//    }
    @GetMapping("list")
    public ResponseEntity<?> getOrder(@ModelAttribute GetAllOrderRequest getAllOrderRequest){
        ApiResponse apiResponse = new ApiResponse();

        Page<OrderResponse> orderPage = orderService.getAllOrders(getAllOrderRequest);
        apiResponse.ok(orderPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping("delete-order")
    public ResponseEntity<?> deleteOrder(
            @Valid @RequestBody Request deleteOrderRequest,
            BindingResult result
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        OrderResponse newOrder = orderService.deleteOrder(deleteOrderRequest);

        apiResponse.ok(newOrder);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("update-order/{id}")
    public ResponseEntity updateOrder(@PathVariable("id") Long id,
                                        @RequestBody UpdateOrderRequest updateOrderRequest,
                                        BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, BadRequestException, DataNotFoundException {

        return orderService.updateOrder(updateOrderRequest, id, bindingResult);

    }

    @PostMapping("update-status")
    public ResponseEntity<?> updateStatusOrder(
            @Valid @RequestBody StatusOrderRequest statusOrderRequest,
            BindingResult result
    )  {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        OrderResponse newOrder = orderService.UpdateOrderStatus(statusOrderRequest);

        apiResponse.ok(newOrder);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

}
