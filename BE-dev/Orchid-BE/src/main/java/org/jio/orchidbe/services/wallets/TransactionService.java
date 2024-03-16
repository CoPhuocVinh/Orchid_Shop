package org.jio.orchidbe.services.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/12/2024
    Time: 1:07 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.wallets.GetAllTransactionResquest;
import org.jio.orchidbe.dtos.wallets.TransactionsResponse;
import org.jio.orchidbe.mappers.wallets.TransactionMapper;
import org.jio.orchidbe.repositorys.products.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
public class TransactionService implements ITransactionService{
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionMapper transactionMapper;
    @Override
    public Page<TransactionsResponse> getAll(GetAllTransactionResquest request) {
        return transactionRepository.findAll(request.getSpecification(),request.getPageable()).map(transactionMapper::toResponse);
    }
}
