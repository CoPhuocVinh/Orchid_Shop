package org.jio.orchidbe.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.enums.OrderStatus;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OrderStatusDTORequest {
    private OrderStatus status;
}
