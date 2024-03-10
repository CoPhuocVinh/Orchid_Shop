package org.jio.orchidbe.repositorys.products;

import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.orders.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {
    Page<Bid> findAll(Specification<Bid> specification, Pageable pageable);

    Bid findByTop1TrueAndAuction_Id(Long auctionId);

    Optional<Bid> findByUser_Id(Long id);

    List<Bid> findByAuction_Id(Long auctionId);

    Boolean existsBidByAuction_IdAndUser_Id(Long auctionId, Long userId);
}
