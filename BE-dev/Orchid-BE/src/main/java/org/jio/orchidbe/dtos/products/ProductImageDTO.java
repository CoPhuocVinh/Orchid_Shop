package org.jio.orchidbe.dtos.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 12:11 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImageDTO {
    @NotBlank(message = "url is required")
    @JsonProperty("image_url")
    private String imageUrl;
    @NotBlank(message = "code is required")
    @JsonProperty("image_code")
    private String imageCode;

   /* @JsonProperty("is_deleted")
    private Boolean deleted;*/

}
