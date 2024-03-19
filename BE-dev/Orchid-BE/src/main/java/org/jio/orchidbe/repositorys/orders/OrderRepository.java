package org.jio.orchidbe.repositorys.orders;

import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.orders.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAll(Specification<Order> specification, Pageable pageable);


    List<Order> findByStatus(OrderStatus orderStatus);

    Order findByAuction(Auction auction);

    Long countByStatus(OrderStatus status);
}
