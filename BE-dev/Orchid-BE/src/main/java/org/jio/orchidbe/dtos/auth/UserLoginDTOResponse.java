package org.jio.orchidbe.dtos.auth;/*  Welcome to Jio word
    @author: Jio
    Date: 2/21/2024
    Time: 5:21 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.users.user_enum.UserRole;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTOResponse {
    private Long id;
    private String name;
    private String email;
    private String img;
    private UserRole role;

}
