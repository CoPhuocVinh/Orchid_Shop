package org.jio.orchidbe.services.orders;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.products.ProductDetailDTOResponse;
import org.jio.orchidbe.enums.TypeTrans;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.orders.OrderMapper;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.orders.PaymentMethod;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.UserInfo;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.models.wallets.Wallet;
import org.jio.orchidbe.repositorys.products.*;
import org.jio.orchidbe.repositorys.users.UserInfoRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.orders.GetAllOrderRequest;
import org.jio.orchidbe.requests.orders.StatusOrderRequest;
import org.jio.orchidbe.requests.orders.UpdateOrderRequest;
import org.jio.orchidbe.responses.AuctionContainer;
import org.jio.orchidbe.responses.OrderContainer;
import org.jio.orchidbe.responses.OrderResponse;
import org.jio.orchidbe.services.wallets.IPaymentService;
import org.jio.orchidbe.utils.GenerateCodeUtils;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.server.NotAcceptableStatusException;

import java.io.UnsupportedEncodingException;
import java.util.List;
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
    private BidRepository bidRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private IPaymentService paymentService;
    @Autowired
    private OrderContainer orderContainer;
    @Autowired
    private AuctionContainer auctionContainer;


    @PostConstruct
    public void initializeOrders() {
        List<Order> pendingOrders = orderRepository.findByStatus(OrderStatus.PENDING);
        for (Order order : pendingOrders) {
            orderContainer.addOrder(order);
        }
    }


////    @Override
//
//public OrderResponse createOrder(Long auctionID) throws DataNotFoundException, BadRequestException {
//    // Retrieve the auction from the database
//    Optional<Auction> auctionOptional = auctionRepository.findById(auctionID);
//    Auction auction = auctionOptional.get();
//    // Create a new order entity
//    Order order = new Order();
//    LocalDateTime currentTime = LocalDateTime.now();
//    LocalDateTime expireTime = currentTime.plusHours(24);
//
//    // Retrieve user information from the order
//    Bid bid = bidRepository.findByAuction_Id(auctionID);
//
//    User user = userRepository.findById(bid.getUser().getId())
//            .orElseThrow(() -> new DataNotFoundException("User not found with ID: " + bid.getUser().getId()));
//    Order finalOrder1 = order;
//    UserInfo userInfo = userInfoRepository.findById(bid.getUser().getId())
//            .orElseThrow(() -> new DataNotFoundException("User information not found with ID: " + bid.getUser().getId()));
//
//    // Set order details
//    order.setPhone(userInfo.getPhone());
//    order.setExpiredAt(expireTime);
//    order.setAddress(userInfo.getAddress());
//    order.setProductCode(auction.getProductCode());
//    order.setProductName(auction.getProductName());
//    order.setUser(user);
//    order.setAuction(auction);
//    order.setStatus(OrderStatus.PENDING);
//    orderContainer.addOrder(order);
//
//    // Save the order to the database
//    order = orderRepository.save(order);
//
//    // Map the order entity to a response DTO and return it
//    return orderMapper.toResponse(order);
//}
//


    @Override
    public Page<OrderResponse> getAllOrders(GetAllOrderRequest getAllOrderRequest) {
        return orderRepository.findAll(getAllOrderRequest.getSpecification(), getAllOrderRequest.getPageable())
                .map(orderMapper::toResponse);
    }

    @Override
    public OrderResponse deleteOrder(Long  id) throws DataNotFoundException {
        Optional<Order> order = orderRepository.findById(id);
        Order existingOrder = order.orElseThrow(() -> new DataNotFoundException("Order not found with id: " + id));
        existingOrder.setDeleted(true);
        Order updatedOrder = orderRepository.save(existingOrder);
        return orderMapper.toResponse(updatedOrder);
    }


    @Override
    @Transactional
    public ResponseEntity updateOrder(UpdateOrderRequest updateOrderRequest, Long id, BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, DataNotFoundException, BadRequestException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        Order order = orderRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Order not found with id: " + id)
        );

        if (order.getStatus().equals(OrderStatus.CONFIRMED)) {
            throw new BadRequestException("Order is CONFIRMED");
        }

        UserInfo userInfo = userInfoRepository.findById(updateOrderRequest.getUserIn4Id()).orElseThrow(
                () -> new DataNotFoundException("UserInfo not found with id: " + updateOrderRequest.getUserIn4Id())
        );
        // if note null ?
        order.setNote(updateOrderRequest.getNote());
        order.setAddress(userInfo.getAddress());
        order.setPhone(userInfo.getPhone());
        // Lấy phương thức thanh toán từ yêu cầu
        PaymentMethod paymentMethod = updateOrderRequest.getPaymentMethod();

        String tranCode = GenerateCodeUtils.generateCode4Transaction(TypeTrans.RT, order.getProductCode(), order.getUser().getId());
        // Tạo một transaction mới
        Transaction transaction = Transaction.builder()
                .order(order)
                .amount(order.getTotal()) // Giả sử giá trị thanh toán là tổng số tiền đơn hàng
                .status(OrderStatus.PENDING) // Trạng thái của giao dịch là chờ xử lý ban đầu
                .paymentMethod(paymentMethod)
                .transactionCode(tranCode)
                .build();
        transactionRepository.save(transaction);
        try {
            if (paymentMethod == PaymentMethod.CARD) {
                // Xử lý thanh toán bằng ví
                order.setPaymentMethod(paymentMethod);
                handleWalletPayment(order, transaction);

            } else if (paymentMethod == PaymentMethod.BANK) {
                // Xử lý thanh toán bằng VNPay
                String vnpayUrl = handleVNPayPayment(order, transaction);
                // Trả về URL của VNPay
                apiResponse.ok(vnpayUrl);
                return ResponseEntity.ok().body(apiResponse);
            } else {
                throw new NotAcceptableStatusException("Unsupported payment method.");
            }

            // Lưu transaction và order sau khi xử lý thanh toán thành công

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
    private void handleWalletPayment(Order order, Transaction transaction) throws BadRequestException, DataNotFoundException, NotAcceptableStatusException {
        // Kiểm tra xem số dư trong ví có đủ để thanh toán không
        Wallet userWallet = walletRepository.findByUser_Id(order.getUser().getId())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find wallet with user_id: " + order.getUser().getId()));
        Float walletBalance = userWallet.getBalance();
        Float orderTotal = order.getTotal();
        transaction.setContent("Thanh toan don hang: " + order.getId());
        if (walletBalance >= orderTotal) {
            // Cập nhật số dư mới cho ví
            Float newBalance = walletBalance - orderTotal;
            userWallet.setBalance(newBalance);
            walletRepository.save(userWallet);

            // Cập nhật trạng thái của giao dịch và đơn hàng
            transaction.setStatus(OrderStatus.CONFIRMED);


            transaction.setResource(
                    GenerateCodeUtils.generateResource4Wallet(userWallet.getId(), order.getProductCode())
            );

            order.setStatus(OrderStatus.CONFIRMED);

        } else {
            // Nếu số dư không đủ, đánh dấu giao dịch là thất bại và đơn hàng là chờ xử lý
            transaction.setStatus(OrderStatus.FAILED);
            order.setStatus(OrderStatus.PENDING);
            transaction.setFailedReason("Insufficient balance in wallet.");
            transactionRepository.save(transaction);
            orderRepository.save(order);
            //
            throw new NotAcceptableStatusException("Insufficient balance in wallet.");
        }
    }

    // Xử lý thanh toán bằng VNPay
    private String handleVNPayPayment(Order order, Transaction transaction) throws UnsupportedEncodingException {
        // Gọi phương thức generatePaymentUrl từ paymentService và trả về URL thanh toán VNPay
        String context = "Order-" + order.getUserName() + "," + order.getProductName() + "-" + order.getId() + "-" + transaction.getId();

        return paymentService.createPayment(order.getTotal(), context, transaction.getId());
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

    @Override
    public OrderResponse getById(Long id) throws DataNotFoundException {
        Order entity = orderRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found .")
        );
        OrderResponse response = orderMapper.toResponse(entity);
        return response;
    }


//    public void validateOrder(String auctionTitle) throws BadRequestException {
//        if (orderRepository.existsOrderByAuctionTitle(auctionTitle)) {
//            throw new BadRequestException("Order with " + auctionTitle + " is existed");
//        }
//    }
}
