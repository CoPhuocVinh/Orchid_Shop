package org.jio.orchidbe.repositorys.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/15/2024
    Time: 11:06 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.models.products.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {

    long countByCategory_Id(long categoryId);

    boolean existsByProductName(String productName);
}
