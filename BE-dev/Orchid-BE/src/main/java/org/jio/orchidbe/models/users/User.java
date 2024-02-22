package org.jio.orchidbe.models.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/9/2024
    Time: 12:34 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.*;
import lombok.*;
import org.jio.orchidbe.models.BaseEntity;
import org.jio.orchidbe.models.users.user_enum.Gender;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import java.time.LocalDateTime;
import java.util.Date;
@Entity
@Table(name = "tblUsers")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", unique = true, nullable = false)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "image_url", length = 255)
    private String img;

    @Column(name = "token", length = 255)
    private String token;

    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;
    @Column(name = "banned", nullable = false)
    private boolean banned = false;

    @Column(name = "dob", nullable = false)
    private Date dob;

    @Column(name = "gender", nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @Column(name = "created_by", nullable = true)
    private String createdBy = "";

    @Column(name = "modified_by", nullable = true)
    private String modifiedBy ="";

    @Version
    @Column(name = "modified_version", nullable = true)
    private  Integer version = 0;

    @Column(name = "expiration_at")
    private LocalDateTime expirationAt;

    @Column(name = "expiration_banned_at")
    private LocalDateTime expirationBannedAt;

    // --- relationship----



}
