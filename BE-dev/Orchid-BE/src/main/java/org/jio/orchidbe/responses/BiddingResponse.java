package org.jio.orchidbe.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BiddingResponse {
    private Long id;
    private Integer ratings;

    private Double biddingPrice;
    private boolean top1;
    private Long auctionID;
    private Long userID;
}
