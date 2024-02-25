package org.jio.orchidbe.services.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/23/2024
    Time: 6:52 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.users.UserIn4DetailDTO;
import org.jio.orchidbe.exceptions.DataNotFoundException;

import java.util.List;

public interface IUserInfoService {
    List<UserIn4DetailDTO> findUserIn4ById(Long id) throws DataNotFoundException;

    UserIn4DetailDTO updateUserIn4ById(Long id) throws DataNotFoundException;
}
