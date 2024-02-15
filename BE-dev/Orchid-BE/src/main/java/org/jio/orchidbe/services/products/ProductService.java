package org.jio.orchidbe.services.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 11:08 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService{
    private final ProductRepository productRepository;
}
