package org.jio.orchidbe.dtos.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/12/2024
    Time: 11:08 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.dtos.common.BaseFilterRequest;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.orders.PaymentMethod;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.models.wallets.Wallet;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class GetAllTransactionResquest extends BaseFilterRequest<Transaction> {

    private String walletId;
    private PaymentMethod paymentMethod;
    private OrderStatus status;
    private String transactionCode;
    private String orderId;
    private String userId;
    @Override
    public Specification<Transaction> getSpecification() {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();


            // Add search criteria
            if (transactionCode != null && !transactionCode.isBlank()) {
                String searchTrim = "%" + transactionCode.trim().toLowerCase() + "%";
                predicates.add(cb.like(cb.lower(root.get(Transaction.Fields.transactionCode)), searchTrim));
            }

            if (paymentMethod != null && !paymentMethod.toString().isEmpty()) {
                predicates.add(cb.equal(root.get(Transaction.Fields.paymentMethod), paymentMethod));
            }

            if (status != null && !status.toString().isEmpty()) {
                predicates.add(cb.equal(root.get(Transaction.Fields.status), status));
            }

            if (orderId != null && !orderId.isBlank()) {
                predicates.add(root.join(Transaction.Fields.order).get(Order.Fields.id).in(orderId));
            }

            if (walletId != null && !walletId.isBlank()) {
                predicates.add(root.join(Transaction.Fields.wallet).get(Wallet.Fields.id).in(walletId));

            }
            if (userId != null && !userId.isBlank()) {

                Predicate walletUser = cb.equal(root.join(Transaction.Fields.wallet).get(Wallet.Fields.user)
                        .get(User.Fields.id), Long.parseLong(userId));

//                Predicate oderUser = cb.equal(root.join(Transaction.Fields.order).get(Order.Fields.user)
//                        .get(User.Fields.id), Long.parseLong(userId));
//
//                Predicate combinedPredicate = cb.or(walletUser,oderUser);

                predicates.add(
                        walletUser
                );

            }


            // Add deleted=false criteria
            predicates.add(cb.equal(root.get(BaseEntity.Fields.deleted), false));

            // Combine predicates with AND
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
