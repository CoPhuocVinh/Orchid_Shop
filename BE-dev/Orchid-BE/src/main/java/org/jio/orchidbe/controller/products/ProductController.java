package org.jio.orchidbe.controller.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/16/2024
    Time: 1:40 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.Delegate;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.products.*;
import org.jio.orchidbe.dtos.users.UserDTORequest;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.services.products.IProductService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/products")
@RequiredArgsConstructor
public class ProductController {
    private final IProductService productService;
    private final ValidatorUtil validatorUtil;
    @PostMapping("")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> createProduct(
            @Valid @RequestBody ProductDTOCreateRequest productDTORequest,
            BindingResult result
    ) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        ProductDetailDTOResponse newProduct = productService.createProduct(productDTORequest);

        apiResponse.ok(newProduct);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> getProduct(@ModelAttribute GetAllPoductDTORequest getAllPoductDTORequest){
        ApiResponse apiResponse = new ApiResponse();

        Page<ProductDTOResponse> productPage = productService.getAllProduct(getAllPoductDTORequest);
        apiResponse.ok(productPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody ProductDTORequest request,
            BindingResult result
    )throws Exception{
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        ProductDetailDTOResponse updated = productService.update(id,request,result);
        apiResponse.ok( updated);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> findProductById(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        ProductDetailDTOResponse response = productService.getById(id);
        apiResponse.ok(response);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> DeleteById(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        ProductDetailDTOResponse response = productService.DeteleById(id);
        apiResponse.ok(response);
        apiResponse.setMessage("delete successfully with product id: " + id);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }


}
