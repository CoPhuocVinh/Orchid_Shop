package org.jio.orchidbe.dtos.auth;/*  Welcome to Jio word
    @author: Jio
    Date: 2/21/2024
    Time: 4:49 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTORequest {
    @JsonProperty("email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password cannot be blank")
    private String password;


}