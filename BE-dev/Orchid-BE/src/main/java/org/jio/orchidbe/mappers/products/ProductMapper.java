package org.jio.orchidbe.mappers.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/16/2024
    Time: 2:12 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.products.ProductDTOCreateRequest;
import org.jio.orchidbe.dtos.products.ProductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.dtos.products.ProductDetailDTOResponse;
import org.jio.orchidbe.models.products.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface ProductMapper {

    ProductDTOResponse toResponse(Product product);

    Product toEntity(ProductDTORequest productDTORequest);
    @Mapping(source = "product.category.id", target = "category_id")
    ProductDetailDTOResponse toResponseDetails(Product product);

    Product toEntityCreated(ProductDTOCreateRequest productDTORequest);

}
