package org.jio.orchidbe.services.products;

import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.mappers.orders.OrderMapper;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.OrderRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.jio.orchidbe.repositorys.products.UserRepository;
import org.jio.orchidbe.requests.orders.CreateOrderRequest;
import org.jio.orchidbe.responses.OrderResponse;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public OrderResponse createOrder(CreateOrderRequest createOrderRequest) throws DataNotFoundException {
        Order order1 = orderMapper.toEntity(createOrderRequest);

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
}
