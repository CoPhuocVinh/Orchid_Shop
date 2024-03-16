package org.jio.orchidbe.mappers.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/12/2024
    Time: 11:43 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.wallets.TransactionsResponse;
import org.jio.orchidbe.dtos.wallets.WalletDTOResponse;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.models.wallets.Wallet;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface TransactionMapper {

    @Mapping(source = "entity.wallet.id", target = "walletId")
    @Mapping(source = "entity.order.id", target = "orderId")
    TransactionsResponse toResponse(Transaction entity);
}
