package org.jio.orchidbe.models.auctions;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;
import org.jio.orchidbe.listener.AuctionListener;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.UserInfo;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@FieldNameConstants
@Entity
@Table(name="tbl_auctions")
@EntityListeners(AuctionListener.class)
public class Auction extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "end_date")
    private LocalDateTime endDate;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status = Status.COMING;

    @Column(name = "deposit_price")
    private Float depositPrice;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "rejected", nullable = false)
    private boolean rejected = false;

    @Column(name = "reject-reason")
    private String rejectReason = "";

    @Column(name = "approved", nullable = false)
    private boolean approved = false;

    @Column(name = "product_name")
    private String productName;

    @Column(name = "product_code")
    private String productCode;

    @Column(name = "created_by")
    private String createdBy = "";

    @Column(name = "modified_by")
    private String modifiedBy = "";

    @Column(name = "image_url")
    private String imageUrl ;

    @Version
    @Column(name = "version", nullable = true)
    private  Integer version = 0;

    @Column(name = "start_price")
    private Float startPrice;

   @Column(name = "end_price")
   private Float endPrice;

   @Column(name = "remind_at")
   private LocalDateTime remindAt;

   @Column(name = "bidding_price")
   private Double biddingPrice;

    @Column(name = "description")
    private String description;

    //
    @ManyToOne()
    @JoinColumn(name = "product_id")
    private Product product;

}
