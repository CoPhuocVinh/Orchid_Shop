package org.jio.orchidbe.controller.products;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.auctions.CreateAuctionResquest;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.OrderResponse;
import org.jio.orchidbe.services.products.IAuctionService;
import org.jio.orchidbe.services.products.IOrderService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OrderController {
    private final IOrderService orderService;
    private final ValidatorUtil validatorUtil;

    @PostMapping("create")
    public ResponseEntity<?> createOrder(
            @Valid @RequestBody CreateOrderRequest createOrderRequest,
            BindingResult result
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        OrderResponse newOrder = orderService.createOrder(createOrderRequest);

        apiResponse.ok(newOrder);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

}
