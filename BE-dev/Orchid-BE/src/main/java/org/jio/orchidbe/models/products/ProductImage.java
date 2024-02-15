package org.jio.orchidbe.models.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/9/2024
    Time: 12:57 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.jio.orchidbe.models.BaseEntity;
@Entity
@Table(name = "tbl_product_img")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductImage extends BaseEntity {

    @Column(name = "image_url", length = 300)
    @JsonProperty("image_url")
    private String imageUrl;
}
