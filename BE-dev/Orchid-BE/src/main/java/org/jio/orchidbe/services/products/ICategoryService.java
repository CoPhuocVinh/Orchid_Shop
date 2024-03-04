package org.jio.orchidbe.services.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 2:05 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.category.CategoryDTORequest;
import org.jio.orchidbe.dtos.category.CategoryDTOResponse;
import org.jio.orchidbe.dtos.category.GetAllCategoryDTORequest;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

public interface ICategoryService {
    Page<CategoryDTOResponse> getAlls(GetAllCategoryDTORequest request);

    CategoryDTOResponse createEntity(CategoryDTORequest request);

    CategoryDTOResponse update(Long id, CategoryDTORequest request, BindingResult result) throws DataNotFoundException;

    CategoryDTOResponse DeteleById(Long id) throws DataNotFoundException;
}
