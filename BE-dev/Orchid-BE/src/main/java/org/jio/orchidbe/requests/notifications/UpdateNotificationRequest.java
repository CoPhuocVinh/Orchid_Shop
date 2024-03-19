package org.jio.orchidbe.requests.notifications;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UpdateNotificationRequest {
    private boolean readed;
}
