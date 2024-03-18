package org.jio.orchidbe.responses;/*  Welcome to Jio word
    @author: Jio
    Date: 3/10/2024
    Time: 8:24 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.jio.orchidbe.enums.Status;

import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class AuctionDetailResponse {
    private Long id;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private String endDate;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private String startDate;

    private String title;
    private Status status;
    private Float depositPrice;
    private Integer quantity;
    private String modifiedBy;

    @JsonProperty("image_url")
    private String imageUrl;

    private String productName;
    private String productCode;
    private String description;
    private Integer version;
    private Float startPrice;
    private Float endPrice;
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private Double biddingPrice;
    private String remindAt;

    private Long productID;
    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private String createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @JsonProperty("updated_at")
    private String updatedAt;

    private List<BiddingResponse> bidList;
}
