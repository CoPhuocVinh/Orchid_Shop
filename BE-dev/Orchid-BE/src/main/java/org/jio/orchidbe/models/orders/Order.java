package org.jio.orchidbe.models.orders;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.users.User;

import java.time.LocalDateTime;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@FieldNameConstants
@Entity
@Table(name="tbl_orders")
public class Order extends BaseEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "total")
    private Float total;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "payment_method")
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    @Column(name = "created_by")
    private String createdBy = "";

    @Column(name = "modified_by")
    private String modifiedBy = "";

    @Column(name = "expired", nullable = false)
    private boolean expired = false;

    @Column(name = "expired_at")
    private LocalDateTime expiredAt;

    @Column(name = "auction_title")
    private String auctionTitle;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_code")
    private String productCode;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "note", nullable = true)
    private String note;

    @Column(name = "user_name")
    private String userName;

    //
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @JoinColumn(name = "auction_id")
    @OneToOne
    private Auction auction;


}
