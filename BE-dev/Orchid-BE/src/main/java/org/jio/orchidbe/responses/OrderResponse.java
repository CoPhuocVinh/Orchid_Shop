package org.jio.orchidbe.responses;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.orders.PaymentMethod;
import org.jio.orchidbe.models.users.User;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderResponse {

    private Long id;
    private Status status;
    private PaymentMethod paymentMethod;
    private Float total;
    private String phone;
    private String address;
    private String createdBy;
    private String modifiedBy;
    private String auctionTitle;
    private String productName;
    private String productCode;
    private Integer quantity;
    private String note;
    private AuctionResponse auction;
    private User user;


    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
}
