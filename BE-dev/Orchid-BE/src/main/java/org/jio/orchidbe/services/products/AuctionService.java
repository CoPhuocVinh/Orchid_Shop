package org.jio.orchidbe.services.products;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.auctions.RegisterAuctionDTO;

import org.jio.orchidbe.dtos.products.ProductDetailDTOResponse;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.orders.OrderMapper;

import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.bids.BiddingMapper;
import org.jio.orchidbe.models.BidingStatus;

import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.UserInfo;
import org.jio.orchidbe.models.wallets.Wallet;
import org.jio.orchidbe.repositorys.products.*;
import org.jio.orchidbe.repositorys.users.UserInfoRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.auctions.*;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.responses.AuctionContainer;

import org.jio.orchidbe.responses.GetAuctionResponse;
import org.jio.orchidbe.responses.OrderContainer;

import org.jio.orchidbe.responses.AuctionDetailResponse;

import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.dao.DataIntegrityViolationException;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.jio.orchidbe.responses.AuctionResponse;
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

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

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
    private OrderService orderService;
    @Autowired
    private OrderContainer orderContainer;
    @Autowired
    private UserInfoRepository userInfoRepository;
    @Autowired
    private AuctionContainer auctionContainer;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private OrderRepository orderRepository;


    @Transactional
    @Override
    public void endAuction(Auction auction) throws DataNotFoundException {

        Bid bid = bidRepository.findByAuctionIdAndTop1(auction.getId(), true);
        if (auction.getStatus() == Status.LIVE) {
            // Cập nhật trạng thái của phiên đấu giá thành đã kết thúc
            auctionContainer.removeAuctionFromList(auction, Status.LIVE);
            auction.setStatus(Status.END);
           // auctionContainer.removeAuctionFromList(auction, Status.LIVE);

            // Tạo entity Order từ auctionID bằng cách sử dụng OrderMapper
            Order order = orderMapper.toEntity(auction.getId());
            Long userId = bid.getUser().getId();
            // Lấy thông tin user từ bid và userInfo
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new DataNotFoundException("User not found with ID: " + bid.getUser().getId()));
            UserInfo userInfo = userInfoRepository.findById(userId)
                    .orElseThrow(() -> new DataNotFoundException("User information not found with ID: " + bid.getUser().getId()));

            // Set các thuộc tính cho order
            order.setPhone(userInfo.getPhone());
            order.setExpiredAt(LocalDateTime.now().plusHours(24));
            order.setAddress(userInfo.getAddress());
            order.setProductCode(auction.getProductCode());
            order.setProductName(auction.getProductName());
            order.setAuction(auction);
            order.setUser(user);
            order.setStatus(OrderStatus.PENDING);
            // Thêm order vào container và lưu order
            orderContainer.addOrder(order);
            orderRepository.save(order);


            auctionRepository.save(auction);
        } else {
            // Xử lý khi phiên đấu giá không ở trạng thái hoạt động
            // Có thể gửi thông báo cho người dùng hoặc ghi log tại đây
        }
    }

    @Override
    public AuctionResponse createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException, DataNotFoundException, BadRequestException {
        Auction newAuction = auctionMapper.toEntity(createAuctionResquest);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");
        LocalDateTime endDate = LocalDateTime.parse(createAuctionResquest.getEndDate(), formatter);
        LocalDateTime startDate = LocalDateTime.parse(createAuctionResquest.getStartDate(), formatter);
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
                                        BindingResult bindingResult) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        Auction auction = auctionContainer.getAuctionById(id);
        auctionContainer.removeOnAuctionListById(id);
        auctionContainer.removeOnStatusLists(auction);
        try {
            if (updateAuctionRequest.getRejected() != null && updateAuctionRequest.getReasonReject() == null) {
                throw new BadRequestException("Fill the reason reject");
            }
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
                        auctionContainer.removeAuctionFromList(auction, Status.WAITING);
                        auction.setStatus(Status.END);
                    } else if (auction.isApproved() && !auction.isRejected()) {
                        auction.setStatus(Status.COMING);
                    }
                }
            } else if (updateAuctionRequest.getStatus().equals(Status.LIVE)) {

                auction.setStatus(Status.LIVE);

            } else if (updateAuctionRequest.getStatus().equals(Status.END)) {

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
            throw new RuntimeException(e);
        }
    }


    @Override
    public AuctionResponse deleteAuction(Long id) throws DataNotFoundException {
        Optional<Auction> aution = auctionRepository.findById(id);
        Auction existingAuction = aution.orElseThrow(() -> new DataNotFoundException("Auction not found with id: " + id));
        existingAuction.setDeleted(true);
        Auction updatedAuction = auctionRepository.save(existingAuction);
        return auctionMapper.toResponse(updatedAuction);
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
            if (wallet.getBalance() >= auction.getDepositPrice()) {
                Float newBalance = wallet.getBalance() - auction.getDepositPrice();
                wallet.setBalance(newBalance);
                walletRepository.save(wallet);

                Bid bid = Bid.builder()
                        .auction(auction)
                        .user(user)
                        .biddingPrice(auction.getDepositPrice())
                        .status(BidingStatus.OPEN)
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
