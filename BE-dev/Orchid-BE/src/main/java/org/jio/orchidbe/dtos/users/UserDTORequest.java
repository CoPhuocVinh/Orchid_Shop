package org.jio.orchidbe.dtos.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/20/2024
    Time: 11:45 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.models.users.user_enum.Gender;
import org.jio.orchidbe.models.users.user_enum.UserRole;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class UserDTORequest {

    private String email;
    private String password;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd'T'", shape = JsonFormat.Shape.STRING)
    private Date dob;
    private Gender gender;

}
