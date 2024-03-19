package org.jio.orchidbe.requests.notifications;

import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.dtos.common.BaseFilterRequest;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.Notification;
import org.jio.orchidbe.models.feedbacks.Feedbacks;
import org.jio.orchidbe.models.orders.Order;
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
public class GetAllNotificationRequest extends BaseFilterRequest<Notification> {

    private String search;
    private Long userId;
    private Boolean readed;

    @Override
    public Specification<Notification> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            // Add search criteria
            if (search != null && !search.isBlank()) {
                String searchTrim = "%" + search.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Notification.Fields.title)), searchTrim));
            }

            // Add auctionTitle criteria
            if (userId != null) {
                predicates.add(cb.equal(root.get(Notification.Fields.user).get(User.Fields.id), userId));
            }


            if (readed != null) {
                if (readed) {
                    predicates.add(cb.isTrue(root.get(Notification.Fields.readed)));
                } else {
                    predicates.add(cb.isFalse(root.get(Notification.Fields.readed)));
                }
            }

            predicates.add(cb.equal(root.get(BaseEntity.Fields.deleted), false));

            // Combine predicates with AND
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
