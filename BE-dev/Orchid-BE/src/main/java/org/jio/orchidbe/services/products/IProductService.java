package org.jio.orchidbe.services.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 11:07 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.products.GetAllPoductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTORequest;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.springframework.data.domain.Page;

public interface IProductService {
    ProductDTOResponse createProduct(ProductDTORequest productDTORequest) throws DataNotFoundException;

    Page<ProductDTOResponse> getAllProduct(GetAllPoductDTORequest getAllPoductDTORequest);
}
