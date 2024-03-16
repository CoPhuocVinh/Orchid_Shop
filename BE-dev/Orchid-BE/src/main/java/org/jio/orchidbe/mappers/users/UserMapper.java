package org.jio.orchidbe.mappers.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 11:03 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.users.UserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.models.users.User;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface UserMapper {

    UserDTOResponse toResponse (User user);

    User toEntity(UserDTORequest request);

}
