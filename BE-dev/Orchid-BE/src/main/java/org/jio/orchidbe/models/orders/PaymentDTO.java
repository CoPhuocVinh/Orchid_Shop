package org.jio.orchidbe.models.orders;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentDTO {
    private String message;
    private String URL;
    private String status;
}
