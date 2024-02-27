package org.jio.orchidbe.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.models.FBStatus;
import org.jio.orchidbe.models.Status;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ReplyResponse {
    private Long id;
    private String content;
    private Integer ratings;
    private FBStatus status;
    private FeedbackResponse feedback;
    private UserDTOResponse user;
}
