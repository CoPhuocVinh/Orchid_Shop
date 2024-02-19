package org.jio.orchidbe.services.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 11:08 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.products.GetAllPoductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.mappers.products.ProductMapper;
import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.repositorys.products.CategoryRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final CategoryRepository categoryRepository;
    @Override
    public ProductDTOResponse createProduct(ProductDTORequest productDTORequest) throws DataNotFoundException {
        Category existingCategory = categoryRepository
                .findById(productDTORequest.getCategoryId())
                .orElseThrow(() ->
                        new DataNotFoundException(
                                "Cannot find category with id: "+ productDTORequest.getCategoryId()));
        //map
        Product product = productMapper.toEntity(productDTORequest);
        product.setCategory(existingCategory);
        //save
        productRepository.save(product);
        //response
        return productMapper.toResponse(product);
    }

    @Override
    public Page<ProductDTOResponse> getAllProduct(GetAllPoductDTORequest request) {

        return productRepository.findAll(request.getSpecification(),request.getPageable()).map(productMapper::toResponse);
    }
}
