package org.jio.orchidbe.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private Float depositPrice;
    private Integer quantity;
    private String productName;
    private String productCode;
    private String createdBy;
    private String modifiedBy;
    private Float startPrice;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)

    private String remindAt;
    private Long product;
}
