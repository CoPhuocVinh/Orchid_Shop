package org.jio.orchidbe.requests.auctions;

import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.dtos.common.BaseFilterRequest;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.User;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class GetAllAuctionResquest extends BaseFilterRequest<Auction> {

    private String search;

    private String productCode;

    private Status status;

    @Override
    public Specification<Auction> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (search != null && !search.isBlank()) {
                String searchTrim = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Auction.Fields.product).get("productName")), searchTrim));
            }

            if (productCode != null && !productCode.isBlank()) {
                String codeTrim = "%" + productCode.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Auction.Fields.productCode).get("productCode")), codeTrim));
            }
            if (status != null && !status.toString().isEmpty()) {
                predicates.add(cb.equal(root.get(Auction.Fields.status), status));
            }
            predicates.add(cb.equal(root.get(BaseEntity.Fields.deleted), false));


            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
