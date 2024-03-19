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
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.jio.orchidbe.requests.ProductDTOResquest;
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
    private final ProductRepository productRepository;


    @PostMapping("/count")
    public Long countProductsByCategoryTypeAndActived(@RequestBody(required = false) ProductDTOResquest request) {
        if (request == null || (request.getType() == null && !request.isActived())) {
            // Nếu request body là null hoặc không có trường nào được cung cấp, đếm tất cả sản phẩm có trạng thái hoạt động là true
            return productRepository.countByActived(true);
        } else {
            // Nếu có request body được cung cấp
            String categoryType = request.getType();
            boolean actived = request.isActived();

            if (categoryType != null && !categoryType.isEmpty() && actived) {
                // Nếu cung cấp cả type và actived, đếm số lượng sản phẩm theo loại danh mục và trạng thái hoạt động
                return productRepository.countByCategoryTypeAndActived(categoryType, actived);
            } else if (categoryType != null && !categoryType.isEmpty()) {
                // Nếu chỉ cung cấp type, đếm tất cả sản phẩm có type như request và mang active cả true và false
                return productRepository.countByCategoryType(categoryType);
            } else if (actived) {
                // Nếu chỉ cung cấp actived, đếm tất cả sản phẩm có actived như request
                return productRepository.countByActived(actived);
            } else {
                throw new IllegalArgumentException("Invalid request");
            }
        }
    }

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
