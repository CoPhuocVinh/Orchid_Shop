package org.jio.orchidbe.services.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/20/2024
    Time: 12:00 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.users.GetAllUserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.springframework.data.domain.Page;

public interface IUserService {
    Page<UserDTOResponse> getAllUser(GetAllUserDTORequest request);
}
