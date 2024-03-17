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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.relation.Role;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class SecurityOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        // handle google lgoin
        OAuth2User oAuth2User =  super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
         //Date iat = oAuth2User.getAttribute("iat");
        // validate fpt email
        // check email
//        if (!ApplicationUtils.isAllowedEmail(email)) {
//            throw new UsernameNotFoundException(String.format( "Email is not allowed to access this system. Only emails with domain %s allowed", String.join(", ", BaseConstants.ALLOWED_DOMAINS)));
//        }

        User user = userRepository.findByEmail(email)
                .orElse(null);

        if (user != null && !user.isDeleted() == true) {
            throw new UsernameNotFoundException("User is not active");
        }

        if (user == null) {
            User newUser = new User();
            newUser.setName(oAuth2User.getAttribute("name"));
            newUser.setEmail(email);
            newUser.setImg(oAuth2User.getAttribute("picture"));
            newUser.setRole(UserRole.CUSTOMER);
            newUser.setDob(new Date());
            newUser.setGender(Gender.FEMALE);
            newUser.setPassword("123456789");

            user =  userRepository.save(newUser);
        }

        UserDetails userDetails = this.userDetailsService.loadUserByUsername(existingUser.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, null,
                userDetails.getAuthorities()
        );
        authenticationToken.setDetails(
                new WebAuthenticationDetailsSource().buildDetails(request)
        );
        //authenticate with Java Spring security
        //authenticationManager.authenticate(authenticationToken);

        return new SecurityUser(user, oAuth2User.getAttributes());
    }
}
