package org.jio.orchidbe.controller;/*  Welcome to Jio word
    @author: Jio
    Date: 2/27/2024
    Time: 1:02 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.users.GetAllUserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;

@RestController
@RequestMapping("${api.prefix}/hello")
public class helloController {
    @GetMapping("")
    @Operation(summary = "Test security ở đây",
            description = "Phương thức này phải add Token mới lấy GET được.")
    @SecurityRequirement(name = "bearer-key")
    public ResponseEntity<?> getHello(){

        return new ResponseEntity<>("hello", HttpStatus.OK);
    }

    @GetMapping("/test")
    //@Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public void redi(HttpServletResponse response) throws IOException {

        //return "redirect:https://orchid.fams.io.vn/api/v1/products";
        //return new RedirectView("https://orchid.fams.io.vn/api/v1/products");
        response.sendRedirect("https://www.facebook.com/phuocvinh.co");
    }


}
