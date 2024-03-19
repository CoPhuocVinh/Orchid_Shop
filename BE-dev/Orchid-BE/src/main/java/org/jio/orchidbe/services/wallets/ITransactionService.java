package org.jio.orchidbe.services.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/12/2024
    Time: 1:07 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.wallets.GetAllTransactionResquest;
import org.jio.orchidbe.dtos.wallets.TransactionResponseWrapper;

public interface ITransactionService {
    TransactionResponseWrapper getAll(GetAllTransactionResquest request, Double total);
}
