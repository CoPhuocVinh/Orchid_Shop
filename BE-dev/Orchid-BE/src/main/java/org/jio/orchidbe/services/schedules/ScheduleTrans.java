package org.jio.orchidbe.services.schedules;/*  Welcome to Jio word
    @author: Jio
    Date: 3/19/2024
    Time: 2:35 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.jio.orchidbe.container.AuctionContainer;
import org.jio.orchidbe.container.TransactionContainer;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.repositorys.wallets.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.jio.orchidbe.utils.WebUtils.convertCurrentToLocalDateTimeWithZone;

@Service
@Log4j2
public class ScheduleTrans {
    @Autowired
    private TransactionContainer transactionContainer;

    @Autowired
    private TransactionRepository transactionRepository;

    @Scheduled(fixedRate = 10000) // Run every 1 minute
    @Transactional
    public void checkOrderExpired() throws DataNotFoundException {
        LocalDateTime currentTime = convertCurrentToLocalDateTimeWithZone();
        List<Long> expireds = getTransactionsAfter(currentTime,transactionContainer.transactions);
        for (Long id : expireds) {
            Transaction transaction = transactionRepository.findById(id)
                    .orElseThrow(() -> new DataNotFoundException("transaction not found"));

            transaction.setStatus(OrderStatus.FAILED);
            transaction.setContent("quá thời gian thanh toán");
            transactionContainer.transactions.remove(id);
        }
    }
    public List<Long> getTransactionsAfter(LocalDateTime targetDateTime, HashMap<Long, LocalDateTime> transactions) {
        List<Long> result = new ArrayList<>();
        for (Map.Entry<Long, LocalDateTime> entry : transactions.entrySet()) {
            if (entry.getValue().isBefore(targetDateTime)) {
                result.add(entry.getKey());
            }
        }
        return result;
    }

}
