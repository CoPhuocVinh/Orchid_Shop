package org.jio.orchidbe.requests.bids;

import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateBidRequest {

    @Max(value = Float.MAX_EXPONENT, message = "Quantity must be less than or equal to 1000")
    private Double biddingPrice;
    private Long auctionID;
    private Long userID;
}
