package org.jio.orchidbe.controller.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/23/2024
    Time: 6:50 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.users.*;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.services.users.IUserInfoService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/userInfo")
@RequiredArgsConstructor
public class UserInfoController {
    private final IUserInfoService userInfoService;

    @GetMapping("/getByUserId/{id}")
    @Operation(security = {@SecurityRequirement(name = "bearer-key")})
    public ResponseEntity<?> getUserInfosById(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        //request.setRole(UserRole.STAFF);
        List<UserIn4DetailDTO> dtoList = userInfoService.findUserIn4ById(id);

        apiResponse.ok(UserInfoDTOResponse
                .builder()
                .userId(id)
                .in4DetailResponseList(dtoList)
                .build()
        );

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(security = {@SecurityRequirement(name = "bearer-key")})
    public ResponseEntity<?> updateUserInfosById(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        //request.setRole(UserRole.STAFF);
        //List<UserIn4DetailDTO> dtoList = userInfoService.findUserIn4ById(id);
        UserIn4DetailDTO dto = userInfoService.updateUserIn4ById(id);
        apiResponse.ok(dto);

        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
