package org.jio.orchidbe.requests.auctions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.Status;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StatusUpdateRequest {
    private Long id;
    private String status;
    private String By;
}
