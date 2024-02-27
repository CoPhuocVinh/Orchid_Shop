package org.jio.orchidbe.requests.orders;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateOrderRequest {
    private Float total;
//    private String phone;
//    private String address;
//    private String createdBy;
//    private String auctionTitle;
//    private String productName;
//    private String productCode;
    private Integer quantity;
    private String note;
}
