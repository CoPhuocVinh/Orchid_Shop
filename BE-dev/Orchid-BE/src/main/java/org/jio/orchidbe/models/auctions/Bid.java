package org.jio.orchidbe.models.auctions;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.users.User;

@AllArgsConstructor
@Builder
@Data
@FieldNameConstants
@NoArgsConstructor
@Entity
@Table(name="tbl_bidding")
public class Bid extends BaseEntity {

    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "bidding_price")
    private double biddingPrice = 0f;


    @Column(name = "top1", nullable = false)
    private boolean top1 = false;

    @Column(name = "ratings")
    private Integer ratings = 0;

}
