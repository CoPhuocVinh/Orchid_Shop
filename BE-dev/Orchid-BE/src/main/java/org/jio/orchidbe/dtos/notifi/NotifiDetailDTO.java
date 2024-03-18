package org.jio.orchidbe.dtos.notifi;/*  Welcome to Jio word
    @author: Jio
    Date: 3/18/2024
    Time: 6:39 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotifiDetailDTO {
    private Long userId;
    private Long id;
    private String msg;
    private String title;
    private boolean readed = false;
}
