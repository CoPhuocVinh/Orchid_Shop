package org.jio.orchidbe.models.wallets;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.OrderStatus;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.orders.PaymentMethod;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@Entity
@Table(name="tbl_transaction")
public class Transaction extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "wallet_id")
    private Wallet user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "resource")
    private String resource;

    @Column(name = "amount")
    private Float amount;

    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;

    @Column(name = "status")
    private OrderStatus status;

    @Column(name = "content")
    private String content;

    @Column(name = "transaction_code")
    private String transactionCode;

    @Column(name = "created_by", nullable = true)
    private String createdBy = "";
}
