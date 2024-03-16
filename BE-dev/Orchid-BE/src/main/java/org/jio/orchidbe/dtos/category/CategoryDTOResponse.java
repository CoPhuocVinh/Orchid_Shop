package org.jio.orchidbe.dtos.category;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 2:36 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTOResponse {

    private Long id;

    private String type;

    private String color;

    private String code;
}
