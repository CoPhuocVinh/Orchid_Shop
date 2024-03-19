package org.jio.orchidbe.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.models.products.Category;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ProductDTOResquest {

    private String type;
    private boolean actived;
}
