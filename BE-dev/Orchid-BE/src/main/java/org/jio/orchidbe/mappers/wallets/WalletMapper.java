package org.jio.orchidbe.mappers.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/3/2024
    Time: 11:30 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.wallets.WalletDTOResponse;
import org.jio.orchidbe.models.wallets.Wallet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface WalletMapper {
    @Mapping(source = "entity.user.id", target = "userId")
    WalletDTOResponse toResponse(Wallet entity);
}
