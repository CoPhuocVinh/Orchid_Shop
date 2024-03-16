package org.jio.orchidbe.services.auctions;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.auctions.RegisterAuctionDTO;

import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.enums.TypeTrans;
import org.jio.orchidbe.exceptions.OptimisticException;

import org.jio.orchidbe.mappers.bids.BiddingMapper;

import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.orders.PaymentMethod;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.UserInfo;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.models.wallets.Wallet;
import org.jio.orchidbe.repositorys.products.*;
import org.jio.orchidbe.repositorys.users.UserInfoRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.auctions.*;
import org.jio.orchidbe.responses.*;

import org.jio.orchidbe.utils.GenerateCodeUtils;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.dao.DataIntegrityViolationException;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.jio.orchidbe.models.auctions.Auction;

import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.mappers.auctions.AuctionMapper;

import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.models.products.Product;

import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.NotAcceptableStatusException;
import org.springframework.web.util.WebUtils;

import java.text.ParseException;
import java.util.*;


@Service
@RequiredArgsConstructor
public class AuctionService implements IAuctionService {
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private ValidatorUtil validatorUtil;
    @Autowired
    private AuctionMapper auctionMapper;
    @Autowired
    private BiddingMapper biddingMapper;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private BidRepository bidRepository;
    @Autowired
    private OrderContainer orderContainer;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private AuctionContainer auctionContainer;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private OrderRepository orderRepository;



    @Transactional
    @Override
    public void endAuction(Auction auction) throws DataNotFoundException {

        Bid bid = bidRepository.findByAuctionIdAndTop1(auction.getId(), true);
        if (bid != null) {
            if (auction.getStatus() == Status.LIVE) {

                // Cập nhật trạng thái của phiên đấu giá thành đã kết thúc
                //auctionContainer.removeAuctionFromList(auction, Status.LIVE);
                auctionContainer.removeOnAuctionListById(auction.getId());
                auctionContainer.removeOnStatusLists(auction);

                auction.setModifiedBy("System");
                auction.setStatus(Status.END);
                // auctionContainer.removeAuctionFromList(auction, Status.LIVE);
                Order orderExisted = orderRepository.findByAuction(auction);
                // Tạo entity Order từ auctionID bằng cách sử dụng OrderMapper
                if (orderExisted != null) {

                } else if (orderExisted == null) {
                    Order order = new Order();
                    Long userId = bid.getUser().getId();
                    // Lấy thông tin user từ bid và userInfo
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new DataNotFoundException("User not found with ID: " + bid.getUser().getId()));
                    UserInfo userInfo = userInfoRepository.findById(userId)
                            .orElseThrow(() -> new DataNotFoundException("User information not found with ID: " + bid.getUser().getId()));

                    // Set các thuộc tính cho order
                    order.setPhone(userInfo.getPhone());
                    //set expired 24h
                    order.setExpiredAt(LocalDateTime.now().plusHours(24));
                    order.setAddress(userInfo.getAddress());
                    order.setProductCode(auction.getProductCode());
                    order.setProductName(auction.getProductName());
                    order.setAuction(auction);
                    order.setCreatedBy("System");
                    order.setTotal(bid.getBiddingPrice());
                    order.setPaymentMethod(PaymentMethod.CARD);
                    order.setQuantity(auction.getQuantity());
                    order.setUserName(user.getUsername());
                    order.setUser(user);
                    order.setStatus(OrderStatus.PENDING);
                    // Thêm order vào container và lưu order
                    orderContainer.addOrder(order);
                    orderRepository.save(order);
                }

            }
        } else {
            // Nếu không có bid, chỉ cần cập nhật trạng thái của phiên đấu giá thành đã kết thúc
            //auctionContainer.removeAuctionFromList(auction, Status.LIVE);
            auctionContainer.removeOnAuctionListById(auction.getId());
            auctionContainer.removeOnStatusLists(auction);

            auction.setModifiedBy("System");
            auction.setStatus(Status.END);
            Product product = productRepository.findById(auction.getProduct().getId())
                    .orElseThrow(() ->
                            new DataNotFoundException(
                                    "Cannot find product with name: " + auction.getProduct().getId()));

            int updatedProductQuantity = product.getQuantity() + auction.getQuantity();
            product.setQuantity(updatedProductQuantity);
            productRepository.save(product);

            // thíu send notification to creator (email or push notifications)

        }

        List<Bid> bids = bidRepository.findByAuctionIdAndTop1False(auction.getId());
        List<Transaction> transactions = new ArrayList<>();

        for (Bid bidFalse : bids) {
            String tranCode = GenerateCodeUtils.generateCode4Transaction(TypeTrans.HT, auction.getProductCode(), bidFalse.getUser().getId());
            // Tạo một transaction mới
            Wallet walletUser = walletRepository.findByUser_Id(bidFalse.getUser().getId())
                    .orElseThrow(() ->
                            new DataNotFoundException(
                                    "Cannot find wallet with id: " + bidFalse.getUser().getId()));

            // t t
            Transaction transaction = Transaction.builder()
                    .amount(auction.getStartPrice()) // Giả sử giá trị thanh toán là tổng số tiền đơn hàng
                    .status(OrderStatus.PENDING) // Trạng thái của giao dịch là chờ xử lý ban đầu
                    .transactionCode(tranCode)
                    .wallet(walletUser)
                    .content("System hoàn tiền " + auction.getStartPrice() + " to " + bidFalse.getUser())
                    .paymentMethod(PaymentMethod.CARD)
                    .build();

            // + tiền
            walletUser.setBalance(walletUser.getBalance() + auction.getStartPrice());

            transaction.setStatus(OrderStatus.CONFIRMED);
            transactions.add(transaction);
        }

        transactionRepository.saveAll(transactions);
        auctionRepository.save(auction);

    }

    @Override
    public AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException, BadRequestException {
        Auction newAuction = auctionMapper.toEntity(createAuctionResquest);
        LocalDateTime endDate = LocalDateTime.parse(createAuctionResquest.getEndDate());
        LocalDateTime startDate = LocalDateTime.parse(createAuctionResquest.getStartDate());
        validateDate(startDate, endDate);
        //map
        Product product = productRepository.findById(createAuctionResquest.getProductID())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find product with id: " + createAuctionResquest.getProductID()));

        // Kiểm tra số lượng của phiên đấu giá
        if (createAuctionResquest.getQuantity() > product.getQuantity()) {
            throw new BadRequestException("Quantity of auction must be less than or equal to product quantity.");
        }

        // Cập nhật số lượng mới của sản phẩm
        int updatedProductQuantity = product.getQuantity() - createAuctionResquest.getQuantity();
        product.setQuantity(updatedProductQuantity);
        productRepository.save(product);
        newAuction.setProductCode(product.getProductCode());
        newAuction.setProductName(product.getProductName());
        newAuction.setDescription(product.getDescription());
        newAuction.setProduct(product);
        newAuction.setStatus(Status.WAITING);
        auctionRepository.save(newAuction);
        auctionContainer.addAuction(newAuction);
        return auctionMapper.toResponse(newAuction);
    }


    @PostConstruct
    public void initializeAuctions() {
        List<Auction> allAuctions = auctionRepository.findAll();
        for (Auction auction : allAuctions) {
            auctionContainer.addAuction(auction);
        }
    }


    @Override
    public Page<GetAuctionResponse> getAllAuctions(GetAllAuctionResquest request) {
        return auctionRepository.findAll(request.getSpecification(), request.getPageable())
                .map(auctionMapper::toAllResponse);
    }


    @Override
    @Transactional
    public ResponseEntity updateAuction(UpdateAuctionRequest updateAuctionRequest, Long id,
                                        BindingResult bindingResult) throws BadRequestException, DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        Auction auction = auctionContainer.getAuctionById(id);

        if ( auction.getStatus().equals(Status.LIVE) ||   auction.getStatus().equals(Status.END)){
            throw new BadRequestException("Auction is close edit because Live or End, can not edit !!! ");
        }

        try {
            if (updateAuctionRequest.getRejected() != null && updateAuctionRequest.getReasonReject() == null) {
                throw new BadRequestException("Fill the reason reject");
            }
            auctionContainer.removeOnAuctionListById(id);
            auctionContainer.removeOnStatusLists(auction);
            // Update auction fields
            ReflectionUtils.doWithFields(updateAuctionRequest.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(updateAuctionRequest);
                if (newValue != null) { // Lấy các giá trị không null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(auction.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, auction, newValue);
                    }
                }
            });
            // Handle status updates
            if (updateAuctionRequest.getStatus() == null) {
                // Xử lý việc cập nhật trạng thái dựa trên các trường khác
                if (updateAuctionRequest.getRejected() != null || updateAuctionRequest.getApproved() != null) {
                    if (auction.isRejected()) {
                        if (updateAuctionRequest.getReasonReject() != null && !updateAuctionRequest.getReasonReject().isBlank()) {
                            auction.setRejectReason(updateAuctionRequest.getReasonReject());
                            auctionContainer.removeAuctionFromList(auction, Status.WAITING);
                            Product product = productRepository.findById(auction.getProduct().getId())
                                    .orElseThrow(() ->
                                            new DataNotFoundException(
                                                    "Cannot find product with name: " + auction.getProduct().getId()));

                            int updatedProductQuantity = product.getQuantity() + auction.getQuantity();
                            product.setQuantity(updatedProductQuantity);
                            productRepository.save(product);
                            auction.setStatus(Status.END);
                        } else if (updateAuctionRequest.getReasonReject() == null || updateAuctionRequest.getReasonReject().isBlank()) {
                            throw new BadRequestException("Fill in the reason for reject");
                        }
                    } else if (auction.isApproved() && !auction.isRejected()) {
                        auction.setStatus(Status.COMING);
                    }
                }
            } else if (updateAuctionRequest.getStatus().equals(Status.LIVE)) {

                auction.setStatus(Status.LIVE);

            } else if (updateAuctionRequest.getStatus().equals(Status.END)) {
                Product product = productRepository.findById(auction.getProduct().getId())
                        .orElseThrow(() ->
                                new DataNotFoundException(
                                        "Cannot find product with name: " + auction.getProduct().getId()));

                int updatedProductQuantity = product.getQuantity() + auction.getQuantity();
                product.setQuantity(updatedProductQuantity);
                productRepository.save(product);
                auction.setStatus(Status.END);
            }

            auctionRepository.save(auction);

            AuctionResponse auctionResponse = auctionMapper.toResponse(auction);
            apiResponse.ok(auctionResponse);
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
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("errorMessage", e.getMessage());
            apiResponse.error(errorMap);
            return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
        }
    }


    @Override
    public AuctionDetailResponse getById(Long id) throws DataNotFoundException {

        Auction auction = auctionRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found user_controller.")
        );
        List<Bid> bids = bidRepository.findByAuction_Id(auction.getId());

        AuctionDetailResponse response = auctionMapper.toResponseDetail(auction);
        response.setBidList(bids.stream().map(biddingMapper::toResponse).toList());
        return response;

    }

    @Override
    @Transactional
    public Boolean registerAuction(Long id, RegisterAuctionDTO dto) throws DataNotFoundException, BadRequestException {

        User user = userRepository.findById(dto.getUserId()).orElseThrow(
                () -> new DataNotFoundException("Not found user_controller.")
        );

        Wallet wallet = walletRepository.findByUser_Id(user.getId()).orElseThrow(
                () -> new DataNotFoundException("Not found wallet.")
        );

        Auction auction = auctionRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found auction.")
        );
        if (auction.getStatus().equals(Status.COMING)
                && !bidRepository.existsBidByAuction_IdAndUser_Id(auction.getId(), user.getId())) {

            if (wallet.getBalance() >= auction.getStartPrice()) {

                String tranCode = GenerateCodeUtils
                        .generateCode4Transaction(TypeTrans.RT, auction.getProductCode(), dto.getUserId());

                Transaction transaction = Transaction.builder()
                        .wallet(wallet)
                        .amount(auction.getDepositPrice() )
                        .status(OrderStatus.CONFIRMED)
                        .paymentMethod(PaymentMethod.CARD)
                        .transactionCode(tranCode)
                        .build();
                transactionRepository.save(transaction);

                Float newBalance = wallet.getBalance() - auction.getStartPrice();
                wallet.setBalance(newBalance);
                walletRepository.save(wallet);

                Bid bid = Bid.builder()
                        .auction(auction)
                        .user(user)
                        .biddingPrice(auction.getStartPrice())
                        .ratings(0)
                        .build();
                bidRepository.save(bid);
            } else {
                throw new NotAcceptableStatusException("Insufficient balance in wallet.");
            }

        } else {
            throw new BadRequestException("auction register failed by user was registered or auction not COMING to register!!!");
        }


        return true;
    }


    public void validateDate(LocalDateTime startDate, LocalDateTime endDate) throws BadRequestException {
        if (endDate.isBefore(startDate)) {
            throw new BadRequestException("End date cannot be before start date!");
        }
    }


    @Override
    @Transactional
    public AuctionResponse DeteleById(Long id) throws DataNotFoundException {
        Auction auction = auctionRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found user_controller.")
        );
        auction.setDeleted(true);
        AuctionResponse response = auctionMapper.toResponse(auction);
        return response;
    }


}
