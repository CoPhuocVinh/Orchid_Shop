package org.jio.orchidbe.dtos.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/4/2024
    Time: 11:30 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImageDTOCreate {
    @NotBlank(message = "url is required")
    @JsonProperty("image_url")
    private String imageUrl;
    @NotBlank(message = "code is required")
    @JsonProperty("image_code")
    private String imageCode;

}
