package org.jio.orchidbe.dtos.category;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 2:45 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTORequest {
    @NotBlank(message = "type is required")
    private String type;
    @NotBlank(message = "color is required")
    private String color;
    @NotBlank(message = "code is required")
    private String code;
}
