package org.jio.orchidbe.controller.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/16/2024
    Time: 1:40 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.products.GetAllPoductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
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
    public ResponseEntity<?> createProduct(
            @Valid @RequestBody ProductDTORequest productDTORequest,
            BindingResult result
    ){
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        ProductDTOResponse newProduct = productService.createProduct(productDTORequest);

        apiResponse.ok(newProduct);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<?> getProduct(@ModelAttribute GetAllPoductDTORequest getAllPoductDTORequest){
        ApiResponse apiResponse = new ApiResponse();

        Page<ProductDTOResponse> productPage = productService.getAllProduct(getAllPoductDTORequest);
        apiResponse.ok(productPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }
}
