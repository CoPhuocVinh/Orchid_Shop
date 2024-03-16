package org.jio.orchidbe.services.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 2:05 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.category.CategoryDTORequest;
import org.jio.orchidbe.dtos.category.CategoryDTOResponse;
import org.jio.orchidbe.dtos.category.GetAllCategoryDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.dtos.products.ProductDetailDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.products.CategoryMapper;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.repositorys.products.CategoryRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;

import java.lang.reflect.Field;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService{
    final private CategoryRepository categoryRepository;
    @Qualifier("categoryMapper")
    private final CategoryMapper mapper;

    @Override
    public Page<CategoryDTOResponse> getAlls(GetAllCategoryDTORequest request) {
        return categoryRepository.findAll(request.getSpecification(), request.getPageable()).map(mapper::toResponse);

    }

    @Override
    public CategoryDTOResponse createEntity(CategoryDTORequest request) {

        Category entity = mapper.toEntity(request);
        try {
            // save
            categoryRepository.save(entity);


        } catch (OptimisticLockingFailureException ex) {
            // Xử lý xung đột dữ liệu ở đây
            // Thông báo cho người dùng hoặc thực hiện các hành động cần thiết
            throw new OptimisticException("Data is updated by another product_controller!");
        } catch (DataIntegrityViolationException e) {

            throw new DataIntegrityViolationException(e.getMessage());

        }
        //response
        return mapper.toResponse(entity);


    }

    @Override
    @Transactional
    public CategoryDTOResponse update(Long id, CategoryDTORequest request, BindingResult result) throws DataNotFoundException {
        Category ob = categoryRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found Category by id : ." + id)
        );
        if (ob.isDeleted() == true){
            throw new DataNotFoundException("Is deteted.");
        }
        CategoryDTOResponse response = null;
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

            response = mapper.toResponse(ob);


        } catch (OptimisticLockingFailureException ex) {
            // Xử lý xung đột dữ liệu ở đây
            // Thông báo cho người dùng hoặc thực hiện các hành động cần thiết
            throw new OptimisticException("Data is updated by another Cate_controller! " + ex.getMessage());
        } catch (DataIntegrityViolationException e) {

            throw new DataIntegrityViolationException(e.getMessage());

        }
        return response;
    }

    @Override
    @Transactional
    public CategoryDTOResponse DeteleById(Long id) throws DataNotFoundException {
        Category entity = categoryRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("Not found .")
        );
        entity.setDeleted(true);
        CategoryDTOResponse response = mapper.toResponse(entity);
        entity.getProducts().forEach(product -> {
            product.setDeleted(true);
            product.getProductImages().forEach(img -> img.setDeleted(true));
        });

        return response;
    }
}
