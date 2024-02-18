package org.jio.orchidbe.dtos.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/17/2024
    Time: 8:24 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.dtos.common.BaseFilterRequest;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class GetAllPoductDTORequest extends BaseFilterRequest<Product> {
    private String search;
    private String code;
    private Long categoryId;
    @Override
    public Specification<Product> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (categoryId != null) {
                predicates.add(cb.equal(root.join(Product.Fields.category).get(Category.Fields.id), categoryId));
            }

            if (search != null && !search.isBlank()) {
                String searchTrim = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Product.Fields.productName)), searchTrim));
            }
            if (code != null && !code.isBlank()) {
                String searchTrim = "%" + code.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Product.Fields.productCode)), searchTrim));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
