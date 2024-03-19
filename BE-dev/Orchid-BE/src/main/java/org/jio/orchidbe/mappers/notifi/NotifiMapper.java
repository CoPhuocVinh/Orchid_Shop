package org.jio.orchidbe.mappers.notifi;/*  Welcome to Jio word
    @author: Jio
    Date: 3/19/2024
    Time: 4:50 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.notifi.NotifiDetailDTO;
import org.jio.orchidbe.models.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface NotifiMapper {
    @Mapping(source = "entity.user.id", target = "userId")
    NotifiDetailDTO toResponse(Notification entity);

}
