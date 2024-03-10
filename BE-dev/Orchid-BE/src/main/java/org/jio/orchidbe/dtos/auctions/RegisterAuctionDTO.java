package org.jio.orchidbe.dtos.auctions;/*  Welcome to Jio word
    @author: Jio
    Date: 3/5/2024
    Time: 12:34 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterAuctionDTO {

    @NotNull(message = "userId is required")
    private Long userId;
}
