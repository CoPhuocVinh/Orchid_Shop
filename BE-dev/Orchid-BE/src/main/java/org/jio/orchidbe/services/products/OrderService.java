package org.jio.orchidbe.services.products;

import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.orders.OrderMapper;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.OrderRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.Request;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.requests.orders.GetAllOrderRequest;
import org.jio.orchidbe.requests.orders.StatusOrderRequest;
import org.jio.orchidbe.requests.orders.UpdateOrderRequest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.OrderResponse;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;

import java.lang.reflect.Field;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private ValidatorUtil validatorUtil;
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public OrderResponse createOrder(CreateOrderRequest createOrderRequest) throws DataNotFoundException, BadRequestException {
        Order order1 = orderMapper.toEntity(createOrderRequest);
        validateOrder(createOrderRequest.getAuctionTitle());

        Auction auction = auctionRepository.findById(createOrderRequest.getAuctionID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createOrderRequest.getAuctionID()));
        User user = userRepository.findById(createOrderRequest.getUserID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createOrderRequest.getUserID()));
        order1.setAuction(auction);
        order1.setUser(user);
        order1.setStatus(Status.WAITING);
        orderRepository.save(order1);

        return orderMapper.toResponse(order1);
    }

    @Override
    public Page<OrderResponse> getAllOrders(GetAllOrderRequest getAllOrderRequest) {
        return orderRepository.findAll(getAllOrderRequest.getSpecification(), getAllOrderRequest.getPageable())
                .map(orderMapper::toResponse);
    }

    @Override
    public OrderResponse deleteOrder(Request request) throws DataNotFoundException {
        Optional<Order> order1 = orderRepository.findById(request.getId());
        Order existingOrder = order1.orElseThrow(() -> new DataNotFoundException("Order not found with id: " + request.getId()));
        existingOrder.setDeleted(true);
        existingOrder.setModifiedBy(request.getBy());
        Order updatedOrder = orderRepository.save(existingOrder);
        return orderMapper.toResponse(updatedOrder);
    }

    @Override
    public ResponseEntity updateOrder(UpdateOrderRequest updateOrderRequest, Long id, BindingResult bindingResult) throws ChangeSetPersister.NotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        final Order order = orderRepository.findById(id).orElseThrow(
                () -> new ChangeSetPersister.NotFoundException()
        );

        try {
            // đổ data theo field
            validateOrder(updateOrderRequest.getProductName());
            ReflectionUtils.doWithFields(updateOrderRequest.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(updateOrderRequest);
                if (newValue != null) { // lấy các giá trị không null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(order.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, order, newValue);
                    }
                }
            });

            Order updateOrder = orderRepository.save(order);

            OrderResponse orderResponse = orderMapper.toResponse(updateOrder);
            apiResponse.ok(orderResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (OptimisticLockingFailureException ex) {
            throw new OptimisticException("Data is updated by another user!");
        } catch (DataIntegrityViolationException e) {
            if (bindingResult.hasErrors()) {
                apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
                return ResponseEntity.badRequest().body(apiResponse);
            }
            throw new DataIntegrityViolationException("Contract data");
        } catch (BadRequestException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public OrderResponse UpdateOrderStatus(StatusOrderRequest request) {
        Optional<Order> existingOrderO = orderRepository.findById(request.getId());
        Order existingOrder = existingOrderO.get();

        if (request.getStatus().equalsIgnoreCase(Status.COMING.name())) {
            existingOrder.setStatus(Status.COMING);
            existingOrder.setModifiedBy(request.getBy());
        } else if (request.getStatus().equalsIgnoreCase(Status.END.name())) {
            existingOrder.setStatus(Status.END);
            existingOrder.setModifiedBy(request.getBy());
        } else if (request.getStatus().equalsIgnoreCase(Status.LIVE.name())) {
            existingOrder.setStatus(Status.LIVE);
            existingOrder.setModifiedBy(request.getBy());
        } else if (request.getStatus().equalsIgnoreCase(Status.APPROVE.name())) {
            existingOrder.setStatus(Status.APPROVE);
            existingOrder.setModifiedBy(request.getBy());
        }
        orderRepository.save(existingOrder);
        return orderMapper.toResponse(existingOrder);
    }


    public void validateOrder(String auctionTitle) throws BadRequestException {
        if (orderRepository.existsOrderByAuctionTitle(auctionTitle)) {
            throw new BadRequestException("Order with " + auctionTitle + " is existed");
        }
    }
}
