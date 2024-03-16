package org.jio.orchidbe.requests.orders;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class StatusOrderRequest {
    private Long id;
    private String status;
    private String By;
}
