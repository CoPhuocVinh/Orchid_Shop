package org.jio.orchidbe.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.models.BidingStatus;
import org.jio.orchidbe.models.Status;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class BiddingResponse {
    private Long id;
    private Integer ratings;
    private BidingStatus status;
    private Float biddingPrice;
    private boolean top1;
    private Long auctionID;
    private Long userID;
}
