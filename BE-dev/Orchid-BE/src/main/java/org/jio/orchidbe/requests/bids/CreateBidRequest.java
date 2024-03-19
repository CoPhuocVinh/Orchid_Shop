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


    private Double biddingPrice;
    private Long auctionID;
    private Long userID;
}
