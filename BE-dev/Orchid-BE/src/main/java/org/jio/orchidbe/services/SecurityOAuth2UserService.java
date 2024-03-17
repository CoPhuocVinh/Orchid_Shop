package org.jio.orchidbe.services;

import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.configs.SecurityUser;
import org.jio.orchidbe.constants.BaseConstants;
import org.jio.orchidbe.enums.Status;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.user_enum.Gender;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.utils.ApplicationUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.management.relation.Role;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class SecurityOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // Xử lý đăng nhập Google
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Trích xuất email từ các thuộc tính OAuth2User
        String email = oAuth2User.getAttribute("email");

        // Kiểm tra email hoặc xử lý email thiếu
        if (StringUtils.isEmpty(email)) {
            throw new UsernameNotFoundException("Email không tồn tại trong thông tin người dùng OAuth2.");
        }

        String principalName = email;
        // Tạo một OAuth2AuthorizedClient với principalName là email
        OAuth2AuthorizedClient authorizedClient = new OAuth2AuthorizedClient(
                userRequest.getClientRegistration(), principalName,
                userRequest.getAccessToken());
        authenticateUser(email, oAuth2User);

        // Trả về người dùng OAuth2
        return oAuth2User;
    }

    private void authenticateUser(String email, OAuth2User oAuth2User) {
        // Tìm kiếm người dùng trong cơ sở dữ liệu bằng email
        User user = userRepository.findByEmail(email).orElse(null);

        if (user != null && user.isDeleted()) {
            throw new UsernameNotFoundException("Người dùng không hoạt động.");
        }

        if (user == null) {
            // Tạo một người dùng mới nếu không tìm thấy
            User newUser = new User();
            newUser.setName(oAuth2User.getAttribute("name"));
            newUser.setEmail(email);
            newUser.setImg(oAuth2User.getAttribute("picture"));
            newUser.setRole(UserRole.CUSTOMER);
            newUser.setDob(new Date());
            newUser.setGender(Gender.FEMALE);
            newUser.setPassword("123456789");

            user = userRepository.save(newUser);
        }

        // Xác thực người dùng với Spring Security
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails.getAuthorities()
        );
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

}
