package org.jio.orchidbe.services.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 11:08 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.products.*;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.products.ProductImageMapper;
import org.jio.orchidbe.mappers.products.ProductMapper;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.products.ProductImage;
import org.jio.orchidbe.repositorys.products.CategoryRepository;
import org.jio.orchidbe.repositorys.products.ProductImageRepository;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;
    private final ProductImageRepository productImageRepository;
    private final ProductImageMapper productImageMapper;

    @Override
    public ProductDetailDTOResponse createProduct(@Valid ProductDTOCreateRequest productDTORequest) throws DataNotFoundException {
        Category existingCategory = categoryRepository
                .findById(productDTORequest.getCategoryId())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find category with id: " + productDTORequest.getCategoryId()));
        //map
        Product product = productMapper.toEntityCreated(productDTORequest);
        //set category by id
        product.setCategory(existingCategory);

        // Set code
        long countProduct = productRepository.countByCategory_Id(existingCategory.getId());
        product.setProductCode(generateProductCode(existingCategory.getCode(), countProduct));
        //save
        try {
            // save product
            productRepository.save(product);
            // save product img
            product.getProductImages().forEach(img -> img.setProduct(product));
            productImageRepository.saveAll(product.getProductImages());

        } catch (OptimisticLockingFailureException ex) {
            // Xử lý xung đột dữ liệu ở đây
            // Thông báo cho người dùng hoặc thực hiện các hành động cần thiết
            throw new OptimisticException("Data is updated by another product_controller!");
        } catch (DataIntegrityViolationException e) {

            if (productRepository.existsByProductName(product.getProductName())) {
                throw new DataIntegrityViolationException("ProductName đã tồn tại");
            }
            throw new DataIntegrityViolationException(e.getMessage());

        }
        //response
        return productMapper.toResponseDetails(product);
    }

    @Override
    public Page<ProductDTOResponse> getAllProduct(GetAllPoductDTORequest request) {

        return productRepository.findAll(request.getSpecification(), request.getPageable()).map(productMapper::toResponse);
    }

    @Override
    @Transactional
    public ProductDetailDTOResponse update(Long id, ProductDTORequest request, BindingResult result) throws DataNotFoundException {
        Product ob = productRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found Product by id : ." + id)
        );
        ProductDetailDTOResponse productDTOResponse = null;
        try {
            // đổ data theo field
            ReflectionUtils.doWithFields(request.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(request);
                if (newValue != null) { // lấy các giá trị ko null
                    String fieldName = field.getName();

                    if (!fieldName.equals("productImages")) {
                        Field existingField = ReflectionUtils.findField(ob.getClass(), fieldName);
                        if (existingField != null) {
                            existingField.setAccessible(true);
                            ReflectionUtils.setField(existingField, ob, newValue);
                        }
                    }


                }
            });

            if (request.getCategoryId() != null && request.getCategoryId() >= 0) {
                Category existingCategory = categoryRepository
                        .findById(request.getCategoryId())
                        .orElseThrow(() ->
                                new DataNotFoundException(
                                        "Cannot find category with id: " + request.getCategoryId()));

                ob.setCategory(existingCategory);
            }

            if (request.getProductImages() != null &&
                    !request.getProductImages().isEmpty()
            ) {
                List<ProductImage> imageList = productImageRepository.findByProduct_Id(id);
                List<String> codeList = new ArrayList<>();
                List<ProductImage> saveImgList = new ArrayList<>();
                request.getProductImages().forEach(img -> {
                    codeList.add(img.getImageCode());
                    Optional<ProductImage> entity = productImageRepository.findByImageCode(img.getImageCode());

                    if (!entity.isPresent()) {
                        ProductImage newImg = productImageMapper.toEntity(img);
                        newImg.setProduct(ob);
                        saveImgList.add(
                                newImg
                        );
                    } else {
                        ProductImage newImg = entity.get();
                        if(img.getImageCode()!= null){
                            newImg.setImageCode(img.getImageCode());
                        }

                        if(img.getImageUrl()!= null){
                            newImg.setImageUrl(img.getImageUrl());
                        }

                        saveImgList.add(newImg);
                    }

                });

                List<ProductImage> deleteImgList =  imageList.stream()
                        .filter(img -> !codeList.contains(img.getImageCode()))
                        .collect(Collectors.toList());


                productImageRepository.deleteAll(deleteImgList);


                productImageRepository.saveAll(saveImgList);
                ob.setProductImages(saveImgList);
            }

            productDTOResponse = productMapper.toResponseDetails(ob);


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
    public ProductDetailDTOResponse getById(Long id) throws DataNotFoundException {
        Product entity = productRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found .")
        );
        if (entity.isDeleted() == true) {
            throw new DataNotFoundException("Is deteted.");
        }
        ProductDetailDTOResponse response = productMapper.toResponseDetails(entity);
        return response;
    }

    @Override
    @Transactional
    public ProductDetailDTOResponse DeteleById(Long id) throws DataNotFoundException {
        Product product = productRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found user_controller.")
        );
        product.setDeleted(true);
        ProductDetailDTOResponse response = productMapper.toResponseDetails(product);
        product.getProductImages().forEach(img -> img.setDeleted(true));

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
