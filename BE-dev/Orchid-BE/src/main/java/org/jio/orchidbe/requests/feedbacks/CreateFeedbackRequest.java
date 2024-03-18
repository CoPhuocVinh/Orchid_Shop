package org.jio.orchidbe.requests.feedbacks;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateFeedbackRequest {
    private String content;
    private Long auctionID;
    private Long userID;
}
