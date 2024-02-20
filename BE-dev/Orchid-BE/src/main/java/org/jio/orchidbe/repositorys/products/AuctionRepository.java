package org.jio.orchidbe.repositorys.products;

import org.jio.orchidbe.models.auctions.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    Page<Auction> findAll(Specification<Auction> specification, Pageable pageable);

}
