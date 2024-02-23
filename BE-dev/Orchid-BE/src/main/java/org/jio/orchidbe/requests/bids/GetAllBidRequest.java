package org.jio.orchidbe.requests.bids;

import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.dtos.common.BaseFilterRequest;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.auctions.Bid;
import org.jio.orchidbe.models.auctions.Auction;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class GetAllBidRequest extends BaseFilterRequest<Bid> {
    private String search;
    private Long auctionId; // Add auctionId field for searching by auction ID

    @Override
    public Specification<Bid> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Add search criteria
            if (search != null && !search.isBlank()) {
                String searchTrim = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Bid.Fields.auction).get(Auction.Fields.id)), searchTrim));
                // Replace 'someField' with the actual field name in the Auction entity you want to search by
            }

            // Add auctionID criteria
            if (auctionId != null) {
                predicates.add(cb.equal(root.get(Bid.Fields.auction).get(Auction.Fields.id), auctionId));
            }

            // Add deleted=false criteria
            predicates.add(cb.equal(root.get(BaseEntity.Fields.deleted), false));

            // Combine predicates with AND
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
