package org.jio.orchidbe.requests.feedbacks;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

public class UpdateFeedbackRequest {
    private String content;
}
