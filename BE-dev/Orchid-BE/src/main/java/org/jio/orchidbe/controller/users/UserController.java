package org.jio.orchidbe.controller.users;/*  Welcome to Jio word
    @author: Jio
    Date: 2/20/2024
    Time: 11:59 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.category.CategoryDTOResponse;
import org.jio.orchidbe.dtos.users.GetAllUserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.services.users.IUserService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService userService;
    private final ValidatorUtil validatorUtil;
    @GetMapping("")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> getUsers(@ModelAttribute GetAllUserDTORequest request){
        ApiResponse apiResponse = new ApiResponse();
        //request.setRole(UserRole.STAFF);
        Page<UserDTOResponse> Page = userService.getAllUser(request);
        apiResponse.ok(Page);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> findUser(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        UserDTOResponse response = userService.getUser(id);
        apiResponse.ok(response);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PostMapping("/register")
    //can we register an "admin" user ?
    public ResponseEntity<?> createUser(
            @Valid @RequestBody UserDTORequest userDTO,
            BindingResult result
    ) throws Exception {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        UserDTOResponse newUser = userService.createUser(userDTO,result);
        apiResponse.ok( newUser);
        return new ResponseEntity<>(apiResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDTORequest userDTO,
            BindingResult result
    )throws Exception{
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        UserDTOResponse updateUser = userService.updateUserIn4(id,userDTO,result);
        apiResponse.ok( updateUser);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }


    // DELETE
    @DeleteMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> DeleteById(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        UserDTOResponse response = userService.DeteleById(id);
        apiResponse.ok(response);
        apiResponse.setMessage("delete successfully with user id: " + id);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

}
