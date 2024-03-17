package org.jio.orchidbe.requests.orders;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private Double total;
    private PaymentMethod paymentMethod;
//    private String phone;
//    private String address;
//    private String createdBy;
//    private String modifiedBy;
//    private String productName;
//    private String productCode;
    private Integer quantity;
    private String note;

//    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
//    private String expiredAt;;

    private Long auctionID;
    private Long userID;

}
