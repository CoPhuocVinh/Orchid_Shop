package org.jio.orchidbe.controller.orders;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.mappers.orders.OrderMapper;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.requests.orders.GetAllOrderRequest;
import org.jio.orchidbe.requests.orders.StatusOrderRequest;
import org.jio.orchidbe.requests.orders.UpdateOrderRequest;
import org.jio.orchidbe.responses.OrderContainer;
import org.jio.orchidbe.responses.OrderResponse;
import org.jio.orchidbe.services.orders.IOrderService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {
    private final IOrderService orderService;
    private final ValidatorUtil validatorUtil;
    private final OrderContainer orderContainer;
    private final OrderMapper orderMapper;

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

    @DeleteMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> DeleteById(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        OrderResponse response = orderService.deleteOrder(id);
        apiResponse.ok(response);
        apiResponse.setMessage("Delete successfully with auction id: " + id);
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

    @GetMapping("/list/pending")
    public List<OrderResponse> getLiveAuctions() {
        // Lấy danh sách các phiên đấu giá có trạng thái LIVE từ AuctionContainer
        List<Order> pendingOrders = orderContainer.getOrders();
        // Chuyển đổi danh sách các phiên đấu giá thành danh sách các phản hồi
        return orderMapper.toResponseList(pendingOrders);
    }
}
