package org.jio.orchidbe.requests.bids;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.models.Status;
import org.jio.orchidbe.responses.AuctionResponse;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateBidRequest {
    private Integer ratings;
    private Float biddingPrice;
    private Long auctionID;
    private Long userID;
}
