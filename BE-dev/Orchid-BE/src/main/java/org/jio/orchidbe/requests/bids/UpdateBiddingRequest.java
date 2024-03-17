package org.jio.orchidbe.requests.bids;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateBiddingRequest {
    private Long userId;
    private Double biddingPrice;
}
