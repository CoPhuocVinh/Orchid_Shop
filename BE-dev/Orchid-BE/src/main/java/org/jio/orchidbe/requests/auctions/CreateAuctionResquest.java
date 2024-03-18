package org.jio.orchidbe.requests.auctions;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.products.Product;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateAuctionResquest {
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private String endDate;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private String startDate;

    @Size(min = 3, max = 200, message = "title must be between 3 and 200 characters")
    private String title;

    @Min(value = 50000, message = "Deposit Price must be greater than or equal to 50000")
    private Float depositPrice;
    @Min(value = 0, message = "Quantity must be greater than or equal to 0")
    @Max(value = 1000, message = "Quantity must be less than or equal to 1000")
    private Integer quantity;

    @JsonProperty("image_url")
    private String imageUrl;

    @Min(value = 10000, message = "Start Price must be greater than or equal to 10000")
    private Float startPrice;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private String remindAt;
    private Long productID;
}
