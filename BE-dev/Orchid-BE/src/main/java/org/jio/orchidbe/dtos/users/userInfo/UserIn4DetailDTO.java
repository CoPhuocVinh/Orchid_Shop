package org.jio.orchidbe.dtos.users.userInfo;/*  Welcome to Jio word
    @author: Jio
    Date: 2/23/2024
    Time: 11:25 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class UserIn4DetailDTO {
    private Long id;

    @Size(min = 3, max = 200, message = "address must be between 3 and 200 characters")
    private String address;

    @Pattern(regexp = "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$"
            , message = "Invalid phone number!")
    private String phone;
    @JsonProperty("info_name")
    private String infoName;
    private boolean defaulted = false;
}
