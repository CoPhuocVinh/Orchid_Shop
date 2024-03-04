package org.jio.orchidbe.dtos.Wallet;/*  Welcome to Jio word
    @author: Jio
    Date: 3/3/2024
    Time: 11:23 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

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
    private Float recharge;

}
