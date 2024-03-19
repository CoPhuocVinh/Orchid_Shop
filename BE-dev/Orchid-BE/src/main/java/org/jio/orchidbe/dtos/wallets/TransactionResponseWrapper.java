package org.jio.orchidbe.dtos.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/19/2024
    Time: 1:40 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.*;
import org.springframework.data.domain.Page;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class TransactionResponseWrapper {
    private Page<TransactionsResponse> transactionPage;
    private Double total;
}
