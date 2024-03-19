package org.jio.orchidbe.services.users;

import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.user_enum.Gender;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.requests.logins.LoginGoogleRequest;
import org.jio.orchidbe.utils.JwtTokenUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.Optional;

@Service
public class LoginService implements ILoginService{

    @Autowired
    private JwtTokenUtils jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Override
    public String handleGoogleLogin(LoginGoogleRequest loginGoogleRequest) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(loginGoogleRequest.getEmail());

        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            // If the user does not exist, create a new user
            User newUser = new User();
            newUser.setName(loginGoogleRequest.getName());
            newUser.setEmail(loginGoogleRequest.getEmail());
            newUser.setImg(loginGoogleRequest.getAvatar());
            newUser.setRole(UserRole.CUSTOMER);
            newUser.setDob(new Date());
            newUser.setGender(Gender.FEMALE);
            newUser.setPassword("123456789");

            user = userRepository.save(newUser);
        }

        // Generate token for the user
        return generateToken(user);
    }

    // Phương thức này có thể thay đổi tùy theo cách bạn tạo token trong ứng dụng của mình
    private String generateToken(User user) throws Exception {
        // Đây là nơi bạn thực hiện logic tạo token, có thể sử dụng JWT hoặc các phương thức xác thực khác
        // Ví dụ đơn giản:
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(user.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        return jwtTokenUtil.generateToken(user);
    }

}
