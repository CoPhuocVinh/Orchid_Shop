package org.jio.orchidbe.dtos.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/12/2024
    Time: 11:40 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.orders.PaymentMethod;
import org.jio.orchidbe.models.wallets.Wallet;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class TransactionsResponse {


    private Long id;

    private String resource;

    private Double amount;

    private PaymentMethod paymentMethod;

    private OrderStatus status;

    private String content;

    private String transactionCode;

    private String failedReason;

    private Long walletId;

    private Long orderId;



}
