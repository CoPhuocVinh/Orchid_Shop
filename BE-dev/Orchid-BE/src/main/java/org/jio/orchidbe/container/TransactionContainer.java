package org.jio.orchidbe.container;/*  Welcome to Jio word
    @author: Jio
    Date: 3/19/2024
    Time: 2:27 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.wallets.Transaction;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
@Component
public class TransactionContainer {
    public HashMap<Long, LocalDateTime> transactions ;
    public TransactionContainer() {
        this.transactions= new HashMap<>();
    }

    public void add(Long id, LocalDateTime exp) {
        transactions.put(id,exp);

    }


}
