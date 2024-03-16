package org.jio.orchidbe.requests.orders;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.orders.PaymentMethod;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateOrderRequest {
    //private Float total;
//    private String phone;
//    private String address;
//    private String createdBy;
//    private String auctionTitle;
//    private String productName;
//    private String productCode;
    private PaymentMethod paymentMethod;
    //private Integer quantity;
    private String note;
    private Long userIn4Id;
}
