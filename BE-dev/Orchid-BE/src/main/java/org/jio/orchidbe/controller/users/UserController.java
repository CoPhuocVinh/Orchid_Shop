package org.jio.orchidbe.controller.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/20/2024
    Time: 11:59 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.products.GetAllPoductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.dtos.users.GetAllUserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import org.jio.orchidbe.services.users.IUserService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;

    @GetMapping("/STAFF")
    public ResponseEntity<?> getStaff(@ModelAttribute GetAllUserDTORequest request){
        ApiResponse apiResponse = new ApiResponse();
        request.setRole(UserRole.STAFF);
        Page<UserDTOResponse> Page = userService.getAllUser(request);
        apiResponse.ok(Page);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/CUSTOMER")
    public ResponseEntity<?> getCUSTOMER(@ModelAttribute GetAllUserDTORequest request){
        ApiResponse apiResponse = new ApiResponse();
        request.setRole(UserRole.CUSTOMER);
        Page<UserDTOResponse> Page = userService.getAllUser(request);
        apiResponse.ok(Page);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
