package org.jio.orchidbe.dtos.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 1:10 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDetailDTOResponse {
    private Long id;
    @NotBlank(message = "name is required")
    @Size(min = 3, max = 200, message = "Name must be between 3 and 200 characters")
    private String productName;
    private String productCode;
    private int quantity;
    private String description;
    private boolean actived;

    private String category_id;
    @JsonProperty("created_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
    private List<ProductImageDTOResponse> productImages;
}
