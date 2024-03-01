package org.jio.orchidbe.services.products;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.orders.OrderMapper;
import org.jio.orchidbe.models.OrderStatus;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.orders.PaymentMethod;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.UserInfo;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.models.wallets.Wallet;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.OrderRepository;
import org.jio.orchidbe.repositorys.products.TransactionRepository;
import org.jio.orchidbe.repositorys.products.WalletRepository;
import org.jio.orchidbe.repositorys.users.UserInfoRepository;
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
import org.springframework.transaction.NoTransactionException;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.server.NotAcceptableStatusException;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.util.Optional;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private OrderMapper orderMapper;
    @Autowired
    private ValidatorUtil validatorUtil;
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private PaymentService paymentService;


    public OrderResponse createOrder(CreateOrderRequest createOrderRequest) throws DataNotFoundException, BadRequestException {
        Order order1 = orderMapper.toEntity(createOrderRequest);
//        validateOrder(createOrderRequest.getAuctionTitle());

        Auction auction = auctionRepository.findById(createOrderRequest.getAuctionID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createOrderRequest.getAuctionID()));
        User user = userRepository.findById(createOrderRequest.getUserID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: "+ createOrderRequest.getUserID()));
        UserInfo userInfo = userInfoRepository.findById(createOrderRequest.getUserID())
                        .orElseThrow(() ->
                                new DataNotFoundException(
                                        "Cannot find product with id: "+ createOrderRequest.getUserID()));
        if (createOrderRequest.getQuantity() > auction.getQuantity()) {
            throw new BadRequestException("Quantity of auction must be less than or equal to product quantity.");
        }

        order1.setPhone(userInfo.getPhone());
        order1.setAddress(userInfo.getAddress());
        order1.setProductCode(auction.getProductCode());
        order1.setProductName(auction.getProductName());
        order1.setUser(user);
        order1.setStatus(OrderStatus.PENDING);
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

//    @Override
//    @Transactional
//    public ResponseEntity updateOrder(UpdateOrderRequest updateOrderRequest, Long id, BindingResult bindingResult) throws ChangeSetPersister.NotFoundException {
//        ApiResponse apiResponse = new ApiResponse();
//        if (bindingResult.hasErrors()) {
//            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
//            return ResponseEntity.badRequest().body(apiResponse);
//        }
//
//        final Order order = orderRepository.findById(id).orElseThrow(
//                () -> new ChangeSetPersister.NotFoundException()
//        );
//        //create new Transaction -> OrderStatus = Pending
//        //check payment method
//
//        // if payment method = wallet
//
//            //check số dư > order.TOtal
//                //
//                //true : số dư = số dư - order total
//                // set status Transaction = confirmed
//                //set Status của Order = confirmed
//                //return successful
//
//                //false: set status Transaction = failed
//                //set Status của Order = Pending
//                //Return Failed vì số dư không   đủ
//
//        // if payment method == vnpay
//            // gọi service Translate url của vnpay truyền tham số "auction-" + id của order
//            // return url
//            //
//
//
//
//        try {
//            // đổ data theo field
////            validateOrder(updateOrderRequest.getProductName());
//            ReflectionUtils.doWithFields(updateOrderRequest.getClass(), field -> {
//                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
//                Object newValue = field.get(updateOrderRequest);
//                if (newValue != null) { // lấy các giá trị không null
//                    String fieldName = field.getName();
//                    Field existingField = ReflectionUtils.findField(order.getClass(), fieldName);
//                    if (existingField != null) {
//                        existingField.setAccessible(true);
//                        ReflectionUtils.setField(existingField, order, newValue);
//                    }
//                }
//            });
//
//            Order updateOrder = orderRepository.save(order);
//
//            OrderResponse orderResponse = orderMapper.toResponse(updateOrder);
//            apiResponse.ok(orderResponse);
//            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
//        } catch (OptimisticLockingFailureException ex) {
//            throw new OptimisticException("Data is updated by another user!");
//        } catch (DataIntegrityViolationException e) {
//            if (bindingResult.hasErrors()) {
//                apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
//                return ResponseEntity.badRequest().body(apiResponse);
//            }
//            throw new DataIntegrityViolationException("Contract data");
//        }
//    }


    @Override
    @Transactional
    public ResponseEntity updateOrder(UpdateOrderRequest updateOrderRequest, Long id, BindingResult bindingResult) throws ChangeSetPersister.NotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        final Order order = orderRepository.findById(id).orElseThrow(
                () -> new ChangeSetPersister.NotFoundException()
        );

        // Lấy phương thức thanh toán từ yêu cầu
        PaymentMethod paymentMethod = updateOrderRequest.getPaymentMethod();

        // Tạo một transaction mới
        Transaction transaction = Transaction.builder()
                .order(order)
                .amount(order.getTotal()) // Giả sử giá trị thanh toán là tổng số tiền đơn hàng
                .status(OrderStatus.PENDING) // Trạng thái của giao dịch là chờ xử lý ban đầu
                .paymentMethod(paymentMethod)
                .transactionCode("RT-" + order.getProductCode())
                .build();

        try {
            if (paymentMethod == PaymentMethod.CARD) {
                // Xử lý thanh toán bằng ví
                handleWalletPayment(order, transaction);
            } else if (paymentMethod == PaymentMethod.BANK) {
                // Xử lý thanh toán bằng VNPay
                String vnpayUrl = handleVNPayPayment(order, transaction);
                // Trả về URL của VNPay
                return ResponseEntity.ok().body(vnpayUrl);
            } else {
                throw new NotAcceptableStatusException("Unsupported payment method.");
            }

            // Lưu transaction và order sau khi xử lý thanh toán thành công
            transactionRepository.save(transaction);
            Order updatedOrder = orderRepository.save(order);

            OrderResponse orderResponse = orderMapper.toResponse(updatedOrder);
            apiResponse.ok(orderResponse);
            return ResponseEntity.ok().body(apiResponse);
        } catch (OptimisticLockingFailureException ex) {
            throw new OptimisticException("Data is updated by another user!");
        } catch (DataIntegrityViolationException e) {
            if (bindingResult.hasErrors()) {
                apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
                return ResponseEntity.badRequest().body(apiResponse);
            }
            throw new DataIntegrityViolationException("Contract data");
        } catch (BadRequestException | DataNotFoundException | UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    // Xử lý thanh toán bằng ví
    private void handleWalletPayment(Order order, Transaction transaction) throws BadRequestException, DataNotFoundException {
        // Kiểm tra xem số dư trong ví có đủ để thanh toán không
        Wallet userWallet = walletRepository.findByUser_Id(order.getUser().getId())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find wallet with user_id: "+ order.getUser().getId()));
        Float walletBalance = userWallet.getBalance();
        Float orderTotal = order.getTotal();
        if (walletBalance >= orderTotal) {
            // Cập nhật số dư mới cho ví
            Float newBalance = walletBalance - orderTotal;
            userWallet.setBalance(newBalance);
            walletRepository.save(userWallet);

            // Cập nhật trạng thái của giao dịch và đơn hàng
            transaction.setStatus(OrderStatus.CONFIRMED);
            order.setStatus(OrderStatus.CONFIRMED);
        } else {
            // Nếu số dư không đủ, đánh dấu giao dịch là thất bại và đơn hàng là chờ xử lý
            transaction.setStatus(OrderStatus.FAILED);
            order.setStatus(OrderStatus.PENDING);
            //
            throw new NotAcceptableStatusException("Insufficient balance in wallet.");
        }
    }

    // Xử lý thanh toán bằng VNPay
    private String handleVNPayPayment(Order order, Transaction transaction) throws UnsupportedEncodingException {
        // Gọi phương thức generatePaymentUrl từ paymentService và trả về URL thanh toán VNPay
        String context = "Order-"+ order.getUserName() +"," + order.getProductName() + "-"+ order.getId() + "-" +transaction.getId();
        return paymentService.createPayment(order.getTotal(), context);
    }

    @Override
    public OrderResponse UpdateOrderStatus(StatusOrderRequest request) {
        Optional<Order> existingOrderO = orderRepository.findById(request.getId());
        Order existingOrder = existingOrderO.get();

        if (request.getStatus().equalsIgnoreCase(OrderStatus.FAILED.name())) {
            existingOrder.setStatus(OrderStatus.FAILED);
            existingOrder.setModifiedBy(request.getBy());

        } else if (request.getStatus().equalsIgnoreCase(OrderStatus.CONFIRMED.name())) {
            existingOrder.setStatus(OrderStatus.CONFIRMED);
            existingOrder.setModifiedBy(request.getBy());
        }
        orderRepository.save(existingOrder);
        return orderMapper.toResponse(existingOrder);
    }


//    public void validateOrder(String auctionTitle) throws BadRequestException {
//        if (orderRepository.existsOrderByAuctionTitle(auctionTitle)) {
//            throw new BadRequestException("Order with " + auctionTitle + " is existed");
//        }
//    }
}
