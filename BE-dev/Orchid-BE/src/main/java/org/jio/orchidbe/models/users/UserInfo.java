package org.jio.orchidbe.models.users;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.BaseEntity;

@AllArgsConstructor
@Builder
@Data
@NoArgsConstructor
@Entity
@Table(name="tbl_userInfo")
public class UserInfo extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "is_default", nullable = false)
    private boolean isDefault = false;



}
