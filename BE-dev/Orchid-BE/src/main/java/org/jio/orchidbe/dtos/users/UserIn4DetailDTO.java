package org.jio.orchidbe.dtos.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/23/2024
    Time: 11:25 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

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

    private String address;

    private String phone;

    private boolean defaulted = false;
}
