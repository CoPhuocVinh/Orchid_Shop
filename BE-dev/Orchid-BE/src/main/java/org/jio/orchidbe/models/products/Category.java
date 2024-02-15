package org.jio.orchidbe.models.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/9/2024
    Time: 12:54 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;
import org.jio.orchidbe.models.BaseEntity;
@Entity
@Table(name = "tbl_categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Category extends BaseEntity {


    @Column(name = "type")
    private String type;


    @Column(name = "color")
    private String color;


    @Column(name = "code")
    private String code;
}
