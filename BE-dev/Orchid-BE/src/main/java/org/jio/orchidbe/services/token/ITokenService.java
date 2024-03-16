package org.jio.orchidbe.services.token;


import jakarta.servlet.http.HttpServletRequest;
import org.jio.orchidbe.models.users.Token;
import org.jio.orchidbe.models.users.User;
import org.springframework.stereotype.Service;

@Service

public interface ITokenService {
    Token addToken(User user, String token, boolean isMobileDevice);
    Token refreshToken(String refreshToken) throws Exception;

    String login(String email, String password, HttpServletRequest request) throws Exception;

    User getUserDetailsFromToken(String token) throws Exception;

    User getUserDetailsFromRefreshToken(String refreshToken) throws Exception;
}
