package org.jio.orchidbe.services.schedules;

import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.OrderRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.OrderContainer;
import org.jio.orchidbe.services.products.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleOrder {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderContainer orderContainer;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private AuctionRepository auctionRepository;


    @Scheduled(fixedRate = 10000) // Run every 1 minute
    public void checkOrderExpired() throws DataNotFoundException {
        LocalDateTime currentTime = LocalDateTime.now();
        List<Order> expiredAuctions = getExpireOrdersStartingAt(currentTime, OrderStatus.PENDING);
        for (Order order : expiredAuctions) {
            order.setStatus(OrderStatus.FAILED);
            order.setExpired(true);
            order.setModifiedBy("System");
            Auction auction = auctionRepository.findById(order.getAuction().getId())
                    .orElseThrow(() ->
                            new DataNotFoundException(
                                    "Cannot find auction with id: " + order.getAuction().getId()));
            Product product = productRepository.findById(auction.getProduct().getId())
                    .orElseThrow(() ->
                            new DataNotFoundException(
                                    "Cannot find product with name: " + auction.getProduct().getId()));
            int updatedProductQuantity = product.getQuantity() + order.getQuantity();
            product.setQuantity(updatedProductQuantity);
            productRepository.save(product);
            orderContainer.removeOrderById(order.getId());
            orderRepository.save(order);
        }
    }

    private List<Order> getExpireOrdersStartingAt(LocalDateTime expire, OrderStatus status) {
        return orderContainer.getOrders().stream()
                .filter(order -> {
                    LocalDateTime orderExpiredAt = order.getExpiredAt();
                    return orderExpiredAt != null && expire.isAfter(orderExpiredAt); // Kiểm tra null trước khi gọi phương thức isAfter()
                })
                .filter(order -> order.getStatus() == status) // Lọc theo trạng thái
                .collect(Collectors.toList());
    }


}