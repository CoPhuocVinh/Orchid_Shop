package org.jio.orchidbe.models.products;/*  Welcome to Jio word
    @author: Jio
    Date: 2/9/2024
    Time: 12:54 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldNameConstants;
import org.jio.orchidbe.models.BaseEntity;

import java.util.List;

@Entity
@Table(name = "tbl_categories")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldNameConstants
public class Category extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "color")
    private String color;


    @Column(name = "code")
    private String code;

    @OneToMany(mappedBy = "category")
    private List<Product> products;
}
