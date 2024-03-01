package org.jio.orchidbe.repositorys.products;

import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    Page<Auction> findAll(Specification<Auction> specification, Pageable pageable);

    boolean existsAuctionByProductName(String productName);

    List<Auction> findByEndDateBeforeAndStatus(LocalDateTime currentTime, Status status);
    List<Auction> findByStartDateAfterAndStatus(LocalDateTime currentTime, Status status);
}
