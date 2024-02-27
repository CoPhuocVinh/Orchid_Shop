package org.jio.orchidbe.mappers.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/23/2024
    Time: 11:27 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.users.userInfo.UserIn4DetailDTO;
import org.jio.orchidbe.dtos.users.userInfo.Userin4DetailCreate;
import org.jio.orchidbe.models.users.UserInfo;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface UserInfoMapper {
    UserInfo toEntity(Userin4DetailCreate dto);

    UserIn4DetailDTO toResponse(UserInfo userInfo);
}
