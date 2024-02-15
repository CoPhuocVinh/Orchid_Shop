package org.jio.orchidbe.models.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/8/2024
    Time: 11:41 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.*;
import org.jio.orchidbe.models.BaseEntity;

@Entity
@Table(name = "tbl_products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product extends BaseEntity {
    @Column(name = "name", nullable = false, length = 350)
    private String name;

    @Column(name = "code", nullable = false, length = 350)
    private String code;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "description")
    private String description;

    @Column(name = "created_by", nullable = true)
    private String createdBy = "";

    @Column(name = "modified_by", nullable = true)
    private String modifiedBy ="";

    @Version
    @Column(name = "modified_version", nullable = true)
    private  Integer version = 0;
}
