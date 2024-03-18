package org.jio.orchidbe.models.wallets;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.orders.PaymentMethod;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@FieldNameConstants
@Entity
@Table(name="tbl_transaction")
public class Transaction extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wallet_id")
    private Wallet wallet;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "resource")
    private String resource;

    @Column(name = "amount")
    private Double amount;
    @Column(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "content")
    private String content;

    @Column(name = "transaction_code")
    private String transactionCode;

    @Column(name = "failed_reason")
    private String failedReason;

    @Column(name = "created_by", nullable = true)
    private String createdBy = "";

    public Double getAmount() {
        return amount != null ? amount : 0;
    }
}
