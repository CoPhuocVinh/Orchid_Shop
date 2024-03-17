package org.jio.orchidbe.dtos.wallets;/*  Welcome to Jio word
    @author: Jio
    Date: 3/3/2024
    Time: 11:29 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;
import org.jio.orchidbe.models.users.User;
@Getter
@Setter
@AllArgsConstructor
@Accessors(chain = true)
@NoArgsConstructor
public class WalletDTOResponse {


    private Long userId;
    private Long id;
    private Double balance;
}
