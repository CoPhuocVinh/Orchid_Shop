package org.jio.orchidbe.services.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/23/2024
    Time: 6:52 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.dtos.users.UserIn4DetailDTO;
import org.jio.orchidbe.dtos.users.UserInfoDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.users.UserInfoMapper;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.UserInfo;
import org.jio.orchidbe.repositorys.users.UserInfoRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class UserInfoService implements IUserInfoService{
    private final UserInfoRepository userInfoRepository;
    private final UserInfoMapper userInfoMapper;
    private final UserRepository userRepository;
    private final IUserService userService;
    @Override
    public List<UserIn4DetailDTO> findUserIn4ById(Long userId) throws DataNotFoundException {
        List<UserInfo> userInfos = userInfoRepository.findAllByUser_Id(userId);
        isUserExistsById(userId);

        return userInfos.stream().map(userInfoMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public UserIn4DetailDTO updateUserIn4ById(Long userId) throws DataNotFoundException {
        isUserExistsById(userId);
        UserIn4DetailDTO userDTOResponse = null;
       /* try {
            // đổ data theo field
            ReflectionUtils.doWithFields(userDTOResponse.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(userDTOResponse);
                if (newValue != null) { // lấy các giá trị ko null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(user.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, user, newValue);
                    }

                }
            });

            userDTOResponse = userMapper.toResponse(user);



        } catch (OptimisticLockingFailureException ex) {
            // Xử lý xung đột dữ liệu ở đây
            // Thông báo cho người dùng hoặc thực hiện các hành động cần thiết
            throw new OptimisticException("Data is updated by another user_controller!");
        }
        catch (DataIntegrityViolationException e) {

            if(userRepository.existsByEmail(userDTO.getEmail())) {
                throw new DataIntegrityViolationException("email đã tồn tại");
            }


        }*/
        return userDTOResponse;
    }

    public void isUserExistsById(Long id) throws DataNotFoundException {

        if (!userRepository.existsById(id)){
            throw new DataNotFoundException("Not found user by id: " + id);
        }

    }


}
