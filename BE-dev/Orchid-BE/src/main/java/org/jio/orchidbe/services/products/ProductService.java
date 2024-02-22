package org.jio.orchidbe.services.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 11:08 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.products.GetAllPoductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.products.ProductMapper;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.repositorys.products.CategoryRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;

    @Override
    public ProductDTOResponse createProduct(ProductDTORequest productDTORequest) throws DataNotFoundException {
        Category existingCategory = categoryRepository
                .findById(productDTORequest.getCategoryId())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find category with id: " + productDTORequest.getCategoryId()));
        //map
        Product product = productMapper.toEntity(productDTORequest);
        //set category by id
        product.setCategory(existingCategory);
        // Set code
        long countProduct = productRepository.countByCategory_Id(existingCategory.getId());
        product.setProductCode(generateProductCode(existingCategory.getCode(), countProduct));
        //save
        try {
            productRepository.save(product);
        } catch (OptimisticLockingFailureException ex) {
            // Xử lý xung đột dữ liệu ở đây
            // Thông báo cho người dùng hoặc thực hiện các hành động cần thiết
            throw new OptimisticException("Data is updated by another product_controller!");
        } catch (DataIntegrityViolationException e) {

            if (productRepository.existsByProductName(product.getProductName())) {
                throw new DataIntegrityViolationException("ProductName đã tồn tại");
            }

        }
        //response
        return productMapper.toResponse(product);
    }

    @Override
    public Page<ProductDTOResponse> getAllProduct(GetAllPoductDTORequest request) {

        return productRepository.findAll(request.getSpecification(), request.getPageable()).map(productMapper::toResponse);
    }

    @Override
    @Transactional
    public ProductDTOResponse update(Long id, ProductDTORequest request, BindingResult result) throws DataNotFoundException {
        Product ob = productRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found Product by id : ." + id)
        );
        ProductDTOResponse productDTOResponse = null;
        try {
            // đổ data theo field
            ReflectionUtils.doWithFields(request.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(request);
                if (newValue != null) { // lấy các giá trị ko null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(ob.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, ob, newValue);
                    }

                }
            });

            productDTOResponse = productMapper.toResponse(ob);


        } catch (OptimisticLockingFailureException ex) {
            // Xử lý xung đột dữ liệu ở đây
            // Thông báo cho người dùng hoặc thực hiện các hành động cần thiết
            throw new OptimisticException("Data is updated by another product_controller!");
        } catch (DataIntegrityViolationException e) {

            if (productRepository.existsByProductName(ob.getProductName())) {
                throw new DataIntegrityViolationException("ProductName đã tồn tại");
            }


        }
        return productDTOResponse;

    }

    @Override
    public ProductDTOResponse getById(Long id) throws DataNotFoundException {
        Product product = productRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found user_controller.")
        );
        ProductDTOResponse response = productMapper.toResponse(product);
        return response;
    }

    private String generateProductCode(String categoryCode, long countProduct) {
        // Lấy thời gian hiện tại
        LocalDateTime currentTime = LocalDateTime.now();

        // Tạo một chuỗi ngẫu nhiên
        String randomString = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 6); // Lấy 6 ký tự đầu

        // Định dạng thời gian theo yyyyMMddHHmmss (năm tháng ngày giờ phút giây)
        String formattedTime = currentTime.format(DateTimeFormatter.ofPattern("mmss"));
        // Kết hợp mã danh mục và thời gian để tạo mã sản phẩm
        String productCode = categoryCode + "-" + countProduct + formattedTime;
        return productCode;
    }
}
