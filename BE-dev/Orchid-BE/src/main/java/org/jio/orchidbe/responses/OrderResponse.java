package org.jio.orchidbe.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.models.orders.PaymentMethod;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderResponse {

    private Long id;
    private OrderStatus status;
    private PaymentMethod paymentMethod;
    private Double total;
    private String phone;
    private String address;
    private String createdBy;
    private String modifiedBy;
    private String auctionTitle;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private String expiredAt;
    private String productName;
    private String productCode;
    private Integer quantity;
    private String note;
    private boolean confirmed;
    private Long auctionID;
    private Long userID;
    //private UserDTOResponse user;


    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
}
