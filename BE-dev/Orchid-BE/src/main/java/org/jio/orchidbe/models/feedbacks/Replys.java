package org.jio.orchidbe.models.feedbacks;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.feedbacks.Feedbacks;
import org.jio.orchidbe.models.users.User;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@Entity
@Table(name="tbl_replys")
public class    Replys extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feedback_id")
    private Feedbacks feedbacks;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @Column(name = "content")
    private String content;

    @Column(name = "ratings")
    private Integer ratings;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private Status status;


}
