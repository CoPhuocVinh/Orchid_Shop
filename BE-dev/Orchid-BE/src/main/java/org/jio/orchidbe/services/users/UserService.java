package org.jio.orchidbe.services.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/20/2024
    Time: 12:00 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.category.CategoryDTOResponse;
import org.jio.orchidbe.dtos.users.GetAllUserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.dtos.users.UserLoginGoogle;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.users.UserMapper;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import org.jio.orchidbe.models.wallets.Wallet;
import org.jio.orchidbe.repositorys.products.WalletRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;

import java.lang.reflect.Field;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{

    final private UserRepository userRepository;
    final private UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final WalletRepository walletRepository;
    private final ValidatorUtil validatorUtil;

    @Override
    public Page<UserDTOResponse> getAllUser(GetAllUserDTORequest request) {
        return userRepository.findAll(request.getSpecification(),request.getPageable()).map(userMapper::toResponse);
    }

    @Override
    public UserDTOResponse createUser(UserDTORequest userDTO, BindingResult bindingResult) throws Exception {
        //register user
        String email = userDTO.getEmail();
        // Kiểm tra xem số điện thoại đã tồn tại hay chưa
        if(userRepository.existsByEmail(email)) {
            throw new DataIntegrityViolationException("email đã tồn tại");
        }

        User newUser = userMapper.toEntity(userDTO);

        newUser.setRole(UserRole.CUSTOMER);
        String password = userDTO.getPassword();
        String encodedPassword = passwordEncoder.encode(password);
        newUser.setPassword(encodedPassword);
        // Kiểm tra nếu có accountId, không yêu cầu password
        try {
            userRepository.save(newUser);
            Wallet walletUser = Wallet.builder()
                    .user(newUser)
                    .balance(0f)
                    .build();
            walletRepository.save(walletUser);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                // Xử lý trường hợp unique constraint violation
                // validate
                throw new DataIntegrityViolationException("email đã tồn tại");

            } else {
                // Xử lý các trường hợp ngoại lệ khác
                throw new Exception("Error in createUser-UserService-"+e.getMessage());
            }
        }
        return userMapper.toResponse(newUser);
    }
    @Override
    public UserDTOResponse createUserLoginGg(UserLoginGoogle request, BindingResult bindingResult) throws Exception {
        // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
        String email = request.getEmail();
        if (userRepository.existsByEmail(email)) {
            throw new DataIntegrityViolationException("Email đã tồn tại");
        }

        // Tạo một đối tượng User mới và đặt các giá trị cho các trường
        User newUser = new User();
        newUser.setImg(request.getAvatar());
        newUser.setName(request.getUsername());
        newUser.setEmail(request.getEmail());

        // Đặt vai trò của người dùng (nếu cần thiết)
        newUser.setRole(UserRole.CUSTOMER);

        // Mã hóa mật khẩu (nếu cần thiết)
        // Ở đây, do việc đăng nhập Google không cần mật khẩu, bạn có thể bỏ qua bước này

        // Lưu người dùng mới vào cơ sở dữ liệu
        try {
            userRepository.save(newUser);
            Wallet walletUser = Wallet.builder()
                    .user(newUser)
                    .balance(0f)
                    .build();
            walletRepository.save(walletUser);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                // Xử lý trường hợp unique constraint violation
                throw new DataIntegrityViolationException("Email đã tồn tại");
            } else {
                // Xử lý các trường hợp ngoại lệ khác
                throw new Exception("Lỗi trong quá trình tạo người dùng: " + e.getMessage());
            }
        }

        // Chuyển đổi đối tượng User thành UserDTOResponse để trả về cho client
        return userMapper.toResponse(newUser);
    }



    @Override
    @Transactional
    public UserDTOResponse updateUserIn4(Long id, UserDTORequest userDTO, BindingResult result) throws DataNotFoundException {
        User user = userRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found user_controller.")
        );
        if (user.isDeleted() == true){
            throw new DataNotFoundException("Is deteted.");
        }
        UserDTOResponse userDTOResponse = null;
        try {
            // đổ data theo field
            ReflectionUtils.doWithFields(userDTO.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(userDTO);
                if (newValue != null) { // lấy các giá trị ko null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(user.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, user, newValue);
                    }

                }
            });

            if(userDTO.getPassword() != null && !userDTO.getPassword().isBlank()){
                String password = userDTO.getPassword();
                String encodedPassword = passwordEncoder.encode(password);
                user.setPassword(encodedPassword);

            }

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


        }
        return userDTOResponse;
    }

    @Override
    public UserDTOResponse getUser(Long id) throws DataNotFoundException {
        User user = userRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found user by id: " + id)
        );
        if (user.isDeleted() == true){
            throw new DataNotFoundException("Is deteted.");
        }
        UserDTOResponse userDTOResponse = userMapper.toResponse(user);
        return userDTOResponse;
    }

    @Override
    public UserDTOResponse DeteleById(Long id) throws DataNotFoundException {
        User entity = userRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found user_controller.")
        );
        entity.setDeleted(true);
        UserDTOResponse response = userMapper.toResponse(entity);
        entity.getUserInfos().forEach(object -> {
            object.setDeleted(true);

        });

        return response;
    }
}
