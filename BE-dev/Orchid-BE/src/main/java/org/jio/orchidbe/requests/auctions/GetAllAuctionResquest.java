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
import org.jio.orchidbe.models.users.user_enum.Gender;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.models.wallets.Wallet;
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
public class GetAllAuctionResquest extends BaseFilterRequest<Auction> {

    private String search;

    private String productCode;

    private String status;
    @Override
    public Specification<Auction> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (status != null && !status.isBlank()) {
                List<Status> statusList = Arrays.stream(status.split("\\."))
                        .map(str -> {
                            try {
                                return Status.valueOf(str.toUpperCase());
                            } catch (IllegalArgumentException e) {
                                // Xử lý trường hợp giá trị không hợp lệ, có thể là trả về một giá trị mặc định hoặc bỏ qua
                                return null; // hoặc thực hiện xử lý khác tùy thuộc vào yêu cầu của bạn
                            }
                        })
                        .filter(Objects::nonNull) // Loại bỏ các giá trị null nếu có
                        .collect(Collectors.toList());
                // Thêm điều kiện cho mỗi
                if (statusList != null && !statusList.isEmpty()) {

                    predicates.add(root.get(Auction.Fields.status).in(statusList));
                }

            }

    /*        if (search != null && !search.isBlank()) {
                String searchTrim = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Auction.Fields.product).get("productName")), searchTrim));
                 // Tạo các điều kiện cho truy vấn
                Predicate titlePredicate = cb.like(cb.lower(root.get(Auction.Fields.title)), searchTrim);
                Predicate categoryPredicate = cb.equal(root.join(Auction.Fields.product)
                        .get(Product.Fields.category).get(Category.Fields.type), searchTrim);

                // Kết hợp hai điều kiện bằng phép "hoặc"
                Predicate combinedPredicate = cb.or(titlePredicate, categoryPredicate);

                // Thêm điều kiện đã kết hợp vào danh sách các điều kiện của truy vấn
                predicates.add(combinedPredicate);
            }*/

            if (search != null && !search.isBlank()) {
                String searchTrim = "%" + search.trim().toLowerCase() + "%";
                // Tạo các điều kiện cho truy vấn
                Predicate titlePredicate = cb.like(cb.lower(root.get(Auction.Fields.title)), searchTrim);
                Predicate categoryPredicate = cb.like(root.join(Auction.Fields.product)
                        .get(Product.Fields.category).get(Category.Fields.type), searchTrim);

                // Kết hợp hai điều kiện bằng phép "và"
                Predicate combinedPredicate = cb.or(titlePredicate, categoryPredicate);

                // Thêm điều kiện đã kết hợp vào danh sách các điều kiện của truy vấn
                predicates.add(combinedPredicate);

            }

      /*      if (search != null && !search.isBlank()) {
                String searchTrim = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.equal(root.join(Auction.Fields.product)
                        .get(Product.Fields.category).get(Category.Fields.type), searchTrim));
            }*/

            if (productCode != null && !productCode.isBlank()) {
                String codeTrim = "%" + productCode.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Auction.Fields.productCode).get("productCode")), codeTrim));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
