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
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class GetAllPoductDTORequest extends BaseFilterRequest<Product> {
    private String productName;
    private String code;
    private String categoryId;
    private Boolean active ;
    @Override
    public Specification<Product> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            /*if (categoryId != null) {
                predicates.add(cb.equal(root.join(Product.Fields.category).get(Category.Fields.id), categoryId));
            }*/

            if(categoryId != null && !categoryId.isBlank()){
                // Chuyển đổi chuỗi categoryId thành danh sách các id
                List<Long> categoryIds = Arrays.stream(categoryId.split("\\."))
                        .map(Long::parseLong)
                        .collect(Collectors.toList());

                // Thêm điều kiện cho mỗi categoryId
                if (categoryIds != null && !categoryIds.isEmpty()) {
                    predicates.add(root.join(Product.Fields.category).get(Category.Fields.id).in(categoryIds));
                }
            }

            if (productName != null && !productName.isBlank()) {
                String searchTrim = "%" + productName.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Product.Fields.productName)), searchTrim));
            }
            if (code != null && !code.isBlank()) {
                String searchTrim = "%" + code.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Product.Fields.productCode)), searchTrim));
            }

            if (active != null) {
                //String searchTrim = "%" + code.trim().toLowerCase() + "%";
                predicates.add(cb.equal(root.get(Product.Fields.actived), active));

            }
            // Thêm điều kiện deleted == false
            predicates.add(cb.equal(root.get(BaseEntity.Fields.deleted), false));
            //predicates.add(cb.equal(root.get("deleted"), false));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
