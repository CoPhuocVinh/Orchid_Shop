package org.jio.orchidbe.repositorys.products;/*  Welcome to Jio word
    @author: Jio
    Date: 3/1/2024
    Time: 1:36 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductImageRepository extends JpaRepository<ProductImage,Long> {
}
