package org.jio.orchidbe.requests.replys;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CreateReplyRequest {
    private String content;
    private Integer ratings;
    private Long userID;
    private Long feedbackID;
}
