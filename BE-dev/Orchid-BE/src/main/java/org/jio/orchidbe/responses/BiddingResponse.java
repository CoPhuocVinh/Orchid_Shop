package org.jio.orchidbe.responses;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Getter
@Setter
public class BiddingResponse {
    private Long id;
    private Integer ratings;

    private Float biddingPrice;
    private boolean top1;
    private Long auctionID;
    private Long userID;
}
