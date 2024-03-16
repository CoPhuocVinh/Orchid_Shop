package org.jio.orchidbe.dtos.category;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 2:27 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.Column;
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
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class GetAllCategoryDTORequest extends BaseFilterRequest<Category> {

    private String type;

    private String color;

    private String code;


    @Override
    public Specification<Category> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (type != null && !type.isBlank()){
                String searchTrim = "%" + type.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Category.Fields.type)), searchTrim));

            }

            if (color != null && !color.isBlank()){
                String searchTrim = "%" + color.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Category.Fields.color)), searchTrim));

            }

            if (code != null && !code.isBlank()){
                String searchTrim = "%" + code.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Category.Fields.code)), searchTrim));

            }
            predicates.add(cb.equal(root.get(BaseEntity.Fields.deleted), false));

            return cb.and(predicates.toArray(new Predicate[0]));
        };

    }
}
