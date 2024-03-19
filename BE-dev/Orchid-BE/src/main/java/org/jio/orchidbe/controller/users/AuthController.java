package org.jio.orchidbe.controller.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/21/2024
    Time: 4:46 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.auth.RefreshTokenDTO;
import org.jio.orchidbe.dtos.auth.UserLoginDTORequest;
import org.jio.orchidbe.mappers.users.UserMapper;
import org.jio.orchidbe.models.users.Token;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.requests.logins.LoginGoogleRequest;
import org.jio.orchidbe.services.token.ITokenService;
import org.jio.orchidbe.services.users.ILoginService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    private final ITokenService tokenService;
    final private UserMapper userMapper;
    private final ValidatorUtil validatorUtil;
    private final ILoginService loginService;

    HashMap<String, Object> megaData = new HashMap<>();

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody UserLoginDTORequest userLoginDTO,
            HttpServletRequest request, BindingResult result
    ) throws Exception {
        ApiResponse apiResponse = new ApiResponse();

        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }


        // Kiểm tra thông tin đăng nhập và sinh token
        String token = tokenService.login(
                userLoginDTO.getEmail(),
                userLoginDTO.getPassword(),
                request
        );
        String userAgent = request.getHeader("User-Agent");
        User userDetail = tokenService.getUserDetailsFromToken(token);
        Token jwtToken = tokenService.addToken(userDetail, token, isMobileDevice(userAgent));

        megaData.put("tokenType",jwtToken.getTokenType());
        megaData.put("access_token", jwtToken.getToken());
        megaData.put("refresh_token", jwtToken.getRefreshToken());

        apiResponse.ok(userMapper.toResponse(userDetail),megaData);
        apiResponse.setMessage("login_successfully");

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping("/google-login")
    public ResponseEntity<String> handleGoogleLogin(LoginGoogleRequest loginGoogleRequest) throws Exception {
        // Gọi service để xử lý yêu cầu và nhận token từ service
        String token = loginService.handleGoogleLogin(loginGoogleRequest);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(
            @Valid @RequestBody RefreshTokenDTO refreshTokenDTO,
            BindingResult result
    ) throws Exception {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        //User userDetail = tokenService.getUserDetailsFromRefreshToken(refreshTokenDTO.getRefreshToken());
        Token jwtToken = tokenService.refreshToken(refreshTokenDTO.getRefreshToken());

        megaData.put("tokenType",jwtToken.getTokenType());
        megaData.put("access_token", jwtToken.getToken());
        megaData.put("refresh_token", jwtToken.getRefreshToken());
        apiResponse.ok(userMapper.toResponse(jwtToken.getUser()),megaData);

        apiResponse.setMessage("Refresh token successfully");

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);

    }
    private boolean isMobileDevice(String userAgent) {
        // Kiểm tra User-Agent header để xác định thiết bị di động
        // Ví dụ đơn giản:
        return userAgent.toLowerCase().contains("mobile");
    }
}
