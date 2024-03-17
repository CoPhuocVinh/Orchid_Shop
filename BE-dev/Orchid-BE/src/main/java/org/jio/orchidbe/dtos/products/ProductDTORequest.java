package org.jio.orchidbe.dtos.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/16/2024
    Time: 1:47 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.jio.orchidbe.dtos.api_response.BaseResponse;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTORequest {


    private String productName;

    @Min(value = 0, message = "Quantity must be greater than or equal to 0")
    @Max(value = 1000, message = "Quantity must be less than or equal to 1000")
    private Integer quantity;
    private String description;

    @JsonProperty("category_id")
    private Long categoryId;

    private Boolean actived = true;
    private List<ProductImageDTO> productImages;
}
