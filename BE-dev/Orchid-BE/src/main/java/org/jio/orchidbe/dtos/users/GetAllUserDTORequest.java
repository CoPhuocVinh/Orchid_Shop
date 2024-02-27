package org.jio.orchidbe.dtos.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/20/2024
    Time: 11:52 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.dtos.common.BaseFilterRequest;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.user_enum.Gender;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class GetAllUserDTORequest extends BaseFilterRequest<User> {
    private String email;
    //@JsonIgnore
    private UserRole role;
    private String gender;
    @Override
    public Specification<User> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (role != null && !role.toString().isEmpty()) {
                predicates.add(cb.equal(root.get(User.Fields.role), role));
            }

            if (email != null && !email.isBlank()) {
                String searchTrim = "%" + email.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(User.Fields.email)), searchTrim));
            }

            if(gender != null && !gender.isBlank()){
                // Chuyển đổi chuỗi categoryId thành danh sách các id
                List<Gender> genders = Arrays.stream(gender.split("\\."))
                        .map(str -> {
                            try {
                                return Gender.valueOf(str.toUpperCase());
                            } catch (IllegalArgumentException e) {
                                // Xử lý trường hợp giá trị không hợp lệ, có thể là trả về một giá trị mặc định hoặc bỏ qua
                                return null; // hoặc thực hiện xử lý khác tùy thuộc vào yêu cầu của bạn
                            }
                        })
                        .filter(Objects::nonNull) // Loại bỏ các giá trị null nếu có
                        .collect(Collectors.toList());

                // Thêm điều kiện cho mỗi
                if (genders != null && !genders.isEmpty()) {

                    predicates.add(root.get(User.Fields.gender).in(genders));
                }
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };


    }
}
