package org.jio.orchidbe.repositorys.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/19/2024
    Time: 1:56 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.models.products.Category;
import org.jio.orchidbe.models.products.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> , JpaSpecificationExecutor<Category> {
}
