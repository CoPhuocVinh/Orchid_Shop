package org.jio.orchidbe.dtos.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/20/2024
    Time: 12:03 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.*;
import org.jio.orchidbe.models.users.user_enum.Gender;
import org.jio.orchidbe.models.users.user_enum.UserRole;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTOResponse {
    private Long id;
    private String name;
    private String email;
    private String img;
    private UserRole role;
    private Date dob;
    private Gender gender;
}
