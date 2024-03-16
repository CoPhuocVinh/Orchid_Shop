package org.jio.orchidbe.mappers.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 12:59 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/


import org.jio.orchidbe.dtos.products.ProductImageDTO;
import org.jio.orchidbe.dtos.products.ProductImageDTOCreate;
import org.jio.orchidbe.dtos.products.ProductImageDTOResponse;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.products.ProductImage;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface ProductImageMapper {
    ProductImageDTOResponse toResponse(ProductImage img);
    ProductImage toEntity(ProductImageDTO dto);
    ProductImage toEntity(ProductImageDTOCreate dto);
}
