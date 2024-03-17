package org.jio.orchidbe.dtos.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/3/2024
    Time: 11:23 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class WalletDTORequest {
    @Min(value = 10000, message = "recharge must be greater than or equal to 10000")
    private Double recharge;

}
