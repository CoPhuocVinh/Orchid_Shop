package org.jio.orchidbe.dtos.notifi;/*  Welcome to Jio word
    @author: Jio
    Date: 3/18/2024
    Time: 6:38 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import lombok.*;

import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class NotificationDTO {
    private Long userId;
    private String userName;

    private List<NotifiDetailDTO> detailDTOList;
}
