package org.jio.orchidbe.dtos.users.userInfo;/*  Welcome to Jio word
    @author: Jio
    Date: 2/23/2024
    Time: 7:17 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.*;
import lombok.experimental.Accessors;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
@Builder
public class UserInfoDTOResponse {
    private Long userId;
    private List<UserIn4DetailDTO> in4DetailResponseList;
}
