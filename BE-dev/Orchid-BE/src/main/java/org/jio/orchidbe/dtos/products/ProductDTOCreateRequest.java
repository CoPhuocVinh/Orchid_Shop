package org.jio.orchidbe.dtos.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 10:58 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTOCreateRequest {

    @NotBlank(message = "name is required")
    @Size(min = 3, max = 200, message = "Name must be between 3 and 200 characters")
    private String productName;

    @Min(value = 0, message = "Quantity must be greater than or equal to 0")
    @Max(value = Integer.MAX_VALUE, message = "Quantity must be less than or equal to 1000")
    private int quantity;

    @Size(min = 80, max = 1000, message = "description must be between 80 and 500 characters")
    private String description;

    @JsonProperty("category_id")
    @NotNull(message = "categoryId not null")
    private Long categoryId;

    private boolean actived = false;

    @NotNull(message = "productImages not null")
    private List<ProductImageDTOCreate> productImages;
}
