package org.jio.orchidbe.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.users.User;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@Entity
@Table(name="tbl_notifications")
public class Notification extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @Column(name = "msg")
    private String msg;

    @Column(name = "title")
    private String title;

    @Column(name = "is_readed", nullable = false)
    private boolean isReaded = false;


}