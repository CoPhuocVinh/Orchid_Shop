package org.jio.orchidbe.models.feedbacks;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.enums.FBStatus;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.users.User;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@FieldNameConstants
@Entity
@Table(name="tbl_feedback")
public class Feedbacks extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "auction_id")
    private Auction auction;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private FBStatus status;
}
