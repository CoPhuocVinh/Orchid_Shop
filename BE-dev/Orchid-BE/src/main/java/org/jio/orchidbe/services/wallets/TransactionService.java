package org.jio.orchidbe.services.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/12/2024
    Time: 1:07 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.annotation.PostConstruct;
import org.jio.orchidbe.container.TransactionContainer;
import org.jio.orchidbe.dtos.wallets.GetAllTransactionResquest;
import org.jio.orchidbe.dtos.wallets.TransactionResponseWrapper;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.mappers.wallets.TransactionMapper;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.repositorys.wallets.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionService implements ITransactionService{
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionMapper transactionMapper;

    @Autowired
    private TransactionContainer transactionContainer;

    @PostConstruct
    public void initializes() {
        List<Transaction> pendingOrders = transactionRepository.findByStatus(OrderStatus.PENDING);
        for (Transaction transaction : pendingOrders) {
            LocalDateTime exp = transaction.getCreatedAt().plusMinutes(15);
            transactionContainer.transactions.put(transaction.getId(),exp);
        }
    }

    @Override
    public TransactionResponseWrapper getAll(GetAllTransactionResquest request, Double total) {
        try{
            Page<Transaction> transactions = transactionRepository.findAll(request.getSpecification(),request.getPageable());

            if (transactions.getTotalElements() > 0){
                // Tính tổng số lượng của các giao dịch
                 total = transactions.stream()
                        .mapToDouble(Transaction::getAmount)
                        .sum();
            }
            TransactionResponseWrapper transactionResponseWrapper = TransactionResponseWrapper
                    .builder()
                    .transactionPage(transactions.map(transactionMapper::toResponse))
                    .total(total)
                    .build();
            return transactionResponseWrapper;

        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
        return null;
    }


}
