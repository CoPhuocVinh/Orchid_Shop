package org.jio.orchidbe.mappers.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 2:37 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.category.CategoryDTORequest;
import org.jio.orchidbe.dtos.category.CategoryDTOResponse;
import org.jio.orchidbe.models.products.Category;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface CategoryMapper {

    CategoryDTOResponse toResponse(Category entity);
    Category toEntity(CategoryDTORequest request);
}
