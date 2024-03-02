package org.jio.orchidbe.requests.auctions;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateAuctionRequest {
    @Min(value = 0, message = "Bidding Price must be greater than or equal to 0")
    private Float biddingPrice;
    @Min(value = 0, message = "Deposit Price must be greater than or equal to 0")
    private Float depositPrice;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime endDate;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime startDate;
    @Min(value = 0, message = "Quantity must be greater than or equal to 0")
    @Max(value = 1000, message = "Quantity must be less than or equal to 1000")
    private Integer quantity;
//    @NotBlank(message = "Product Code is required")
//    @Size(min = 3, max = 200, message = "Name must be between 3 and 200 characters")
//    private String productCode;
//    @NotBlank(message = "Product Name is required")
//    @Size(min = 3, max = 200, message = "Name must be between 3 and 200 characters")
//    private String productName;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime remindAt;
    @Min(value = 0, message = "Start Price must be greater than or equal to 0")
    private Float startPrice;

    private Boolean approved;
    private Boolean rejected;
    private String reasonReject;
}
