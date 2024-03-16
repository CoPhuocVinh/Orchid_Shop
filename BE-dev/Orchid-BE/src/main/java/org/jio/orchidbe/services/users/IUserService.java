package org.jio.orchidbe.services.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/20/2024
    Time: 12:00 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.users.GetAllUserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

public interface IUserService {
    Page<UserDTOResponse> getAllUser(GetAllUserDTORequest request);

    UserDTOResponse createUser(UserDTORequest userDTO, BindingResult result) throws Exception;

    UserDTOResponse updateUserIn4(Long id, UserDTORequest userDTO, BindingResult result) throws DataNotFoundException;

    UserDTOResponse getUser(Long id) throws DataNotFoundException;

    UserDTOResponse DeteleById(Long id) throws DataNotFoundException;
}
