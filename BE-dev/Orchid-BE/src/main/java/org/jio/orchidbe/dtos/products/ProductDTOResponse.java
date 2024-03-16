package org.jio.orchidbe.dtos.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 11:04 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.jio.orchidbe.dtos.api_response.BaseResponse;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTOResponse {
    private Long id;
    @NotBlank(message = "name is required")
    @Size(min = 3, max = 200, message = "Name must be between 3 and 200 characters")
    private String productName;
    private String productCode;
    private int quantity;
    private String description;
    private boolean actived ;

    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;

}
