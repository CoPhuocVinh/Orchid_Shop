package org.jio.orchidbe.controller.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 1:55 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.category.CategoryDTORequest;
import org.jio.orchidbe.dtos.category.CategoryDTOResponse;
import org.jio.orchidbe.dtos.category.GetAllCategoryDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOCreateRequest;
import org.jio.orchidbe.dtos.products.ProductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.dtos.products.ProductDetailDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.services.products.ICategoryService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final ValidatorUtil validatorUtil;
    private final ICategoryService categoryService;
    // GETS
    @GetMapping("")
    public ResponseEntity<?> getlistCategory(
            @ModelAttribute GetAllCategoryDTORequest request){
        ApiResponse apiResponse = new ApiResponse();

        Page<CategoryDTOResponse> Page = categoryService.getAlls(request);
        apiResponse.ok(Page);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
    // GET BY ID ?

    // POST
    @PostMapping("")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> create(
            @Valid @RequestBody CategoryDTORequest request,
            BindingResult result
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        CategoryDTOResponse newEntity = categoryService.createEntity(request);

        apiResponse.ok(newEntity);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
    // PUT

    @PutMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody CategoryDTORequest request,
            BindingResult result
    )throws Exception{
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        CategoryDTOResponse updated = categoryService.update(id,request,result);
        apiResponse.ok( updated);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    // DELETE
    @DeleteMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> DeleteById(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        CategoryDTOResponse response = categoryService.DeteleById(id);
        apiResponse.ok(response);
        apiResponse.setMessage("delete successfully with Category id: " + id);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }


}
