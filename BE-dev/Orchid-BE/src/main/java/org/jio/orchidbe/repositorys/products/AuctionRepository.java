package org.jio.orchidbe.repositorys.products;

import org.jio.orchidbe.models.auctions.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {

}
