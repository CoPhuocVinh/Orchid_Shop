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

import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {

    long countByCategory_Id(long categoryId);
    Long countByActived(boolean actived);

    Long countByCategoryType(String categoryType);

    Long countByCategoryTypeAndActived(String categoryType, boolean actived);

    boolean existsByProductName(String productName);

    Optional<Product> findById(Long id);
}
