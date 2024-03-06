package org.jio.orchidbe.requests.orders;

import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.dtos.common.BaseFilterRequest;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.orders.Order;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class GetAllOrderRequest extends BaseFilterRequest<Order> {
    private String search;
    private String auctionTitle;

    @Override
    public Specification<Order> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Add search criteria
            if (search != null && !search.isBlank()) {
                String searchTrim = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Order.Fields.auctionTitle)), searchTrim));
            }

            // Add auctionTitle criteria
            if (auctionTitle != null && !auctionTitle.isBlank()) {
                String codeTrim = "%" + auctionTitle.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Order.Fields.auctionTitle)), codeTrim));
            }

            // Add deleted=false criteria
            predicates.add(cb.equal(root.get(BaseEntity.Fields.deleted), false));

            // Combine predicates with AND
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}