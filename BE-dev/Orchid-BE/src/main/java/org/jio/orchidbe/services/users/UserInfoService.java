package org.jio.orchidbe.services.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/23/2024
    Time: 6:52 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.users.userInfo.UserIn4DetailDTO;
import org.jio.orchidbe.dtos.users.userInfo.Userin4DetailCreate;
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
import org.springframework.validation.BindingResult;

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
        isUserExistsById(userId);
        List<UserInfo> userInfos = userInfoRepository.findAllByDeletedFalseAndUser_Id(userId);


        return userInfos.stream().map(userInfoMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserIn4DetailDTO updateUserIn4ById(Long Id, UserIn4DetailDTO userDTO, BindingResult result) throws DataNotFoundException {

        //isUserExistsById(userId);
        UserInfo userin4 = userInfoRepository.findById(Id).orElseThrow(
                () -> new DataNotFoundException("Not found userinfo.")
        );
        if (userin4.isDeleted() == true){
            throw new DataNotFoundException("Is deteted.");
        }
        UserIn4DetailDTO userDTOResponse = null;
        try {
            // đổ data theo field
            ReflectionUtils.doWithFields(userDTO.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(userDTO);
                if (newValue != null) { // lấy các giá trị ko null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(userin4.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, userin4, newValue);
                    }

                }
            });

            userDTOResponse = userInfoMapper.toResponse(userin4);



        } catch (OptimisticLockingFailureException ex) {
            // Xử lý xung đột dữ liệu ở đây
            // Thông báo cho người dùng hoặc thực hiện các hành động cần thiết
            throw new OptimisticException("Data is updated by another user_controller!");
        }
        catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException(e.getMessage());

        }
        return userDTOResponse;
    }

    @Override
    public List<UserIn4DetailDTO> findUserIn4DefaultById(Long id) throws DataNotFoundException {
        isUserExistsById(id);
        List<UserInfo> userInfos = userInfoRepository.findAllByDeletedFalseAndDefaultedTrueAndUser_Id(id);


        return userInfos.stream().map(userInfoMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public UserIn4DetailDTO CreateUserIn4DefaultById(Long id, @Valid Userin4DetailCreate userDTO) throws Exception {
        User user = userRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found user by id: " + id)
        );
        UserInfo newUserIn4 = userInfoMapper.toEntity(userDTO);
        newUserIn4.setUser(user);
        try {
            userInfoRepository.save(newUserIn4);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                // Xử lý trường hợp unique constraint violation
                // validate
                throw new DataIntegrityViolationException("email đã tồn tại");

            } else {
                // Xử lý các trường hợp ngoại lệ khác
                throw new Exception("Error in createUserIn4-UserIn4Service-"+e.getMessage());
            }
        }
        return userInfoMapper.toResponse(newUserIn4);

    }

    public void isUserExistsById(Long id) throws DataNotFoundException {

        if (!userRepository.existsById(id)){
            throw new DataNotFoundException("Not found user by id: " + id);
        }

    }


}
