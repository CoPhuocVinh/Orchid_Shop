package org.jio.orchidbe.requests.orders;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.orders.PaymentMethod;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateOrderRequest {
    private String auctionTitle;;
    private Float total;
    private PaymentMethod paymentMethod;
    private String phone;
    private String address;
    private String createdBy;
    private String modifiedBy;
    private String productName;
    private String productCode;
    private Integer quantity;
    private String note;
    private Long auctionID;
    private Long userID;

}
