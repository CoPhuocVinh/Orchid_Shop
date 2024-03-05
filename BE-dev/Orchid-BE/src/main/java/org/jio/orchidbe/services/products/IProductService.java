package org.jio.orchidbe.services.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 11:07 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.validation.Valid;
import org.jio.orchidbe.dtos.products.*;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;

public interface IProductService {
    ProductDetailDTOResponse createProduct(@Valid ProductDTOCreateRequest productDTORequest) throws DataNotFoundException;

    Page<ProductDTOResponse> getAllProduct(GetAllPoductDTORequest getAllPoductDTORequest);

    ProductDetailDTOResponse update(Long id, ProductDTORequest request, BindingResult result) throws DataNotFoundException;

    ProductDetailDTOResponse getById(Long id) throws DataNotFoundException;

    ProductDetailDTOResponse DeteleById(Long id) throws DataNotFoundException;
}
