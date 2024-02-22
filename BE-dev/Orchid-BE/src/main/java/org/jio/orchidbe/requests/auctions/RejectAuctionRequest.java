package org.jio.orchidbe.requests.auctions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RejectAuctionRequest {
    private Long id;
    private String By;
    private String reason;
}
