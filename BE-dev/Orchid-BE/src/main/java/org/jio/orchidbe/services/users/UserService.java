package org.jio.orchidbe.services.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/20/2024
    Time: 12:00 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.users.GetAllUserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.mappers.users.UserMapper;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    final private UserRepository userRepository;
    final private UserMapper userMapper;
    @Override
    public Page<UserDTOResponse> getAllUser(GetAllUserDTORequest request) {
        return userRepository.findAll(request.getSpecification(),request.getPageable()).map(userMapper::toResponse);
    }
}
