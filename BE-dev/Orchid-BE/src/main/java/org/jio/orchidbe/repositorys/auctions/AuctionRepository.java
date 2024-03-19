package org.jio.orchidbe.repositorys.auctions;

import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    Page<Auction> findAll(Specification<Auction> specification, Pageable pageable);

    boolean existsAuctionByProductName(String productName);
    Optional<Auction> findById(Long id);

    List<Auction> findByEndDateBeforeAndStatus(LocalDateTime currentTime, Status status);
    List<Auction> findByStartDateAfterAndStatus(LocalDateTime currentTime, Status status);
    Long countByStatus(Status status);
}
