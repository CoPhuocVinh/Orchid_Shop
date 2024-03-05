package org.jio.orchidbe.dtos.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 2:00 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImageDTOResponse {
    private Long id;
    @JsonProperty("image_url")
    private String imageUrl;


    @JsonProperty("image_code")
    private String imageCode;
}
