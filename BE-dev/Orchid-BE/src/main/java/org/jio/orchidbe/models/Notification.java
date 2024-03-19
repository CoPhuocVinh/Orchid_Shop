package org.jio.orchidbe.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldNameConstants;
import org.jio.orchidbe.listener.NotificationListener;
import org.jio.orchidbe.models.users.User;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@FieldNameConstants
@Entity
@Table(name="tbl_notifications")
@EntityListeners(NotificationListener.class)
public class Notification extends BaseEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "msg")
    private String msg;

    @Column(name = "title")
    private String title;

    @Column(name = "readed", nullable = false)
    private boolean readed = false;

}