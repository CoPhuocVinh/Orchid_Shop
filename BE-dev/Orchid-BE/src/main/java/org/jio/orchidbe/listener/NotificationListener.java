package org.jio.orchidbe.listener;/*  Welcome to Jio word
    @author: Jio
    Date: 3/19/2024
    Time: 7:08 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.PostPersist;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.constants.BaseConstants;
import org.jio.orchidbe.dtos.notifi.NotifiDetailDTO;
import org.jio.orchidbe.mappers.notifi.NotifiMapper;
import org.jio.orchidbe.models.Notification;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import org.jio.orchidbe.services.firebase.IFirebaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.jio.orchidbe.constants.BaseConstants.COLLECTION_AUCTION;

@AllArgsConstructor
@NoArgsConstructor
@Component
public class NotificationListener {

    @Autowired
    private IFirebaseService firebaseService;
    @Autowired
    private NotifiMapper notifiMapper;
    private static final Logger logger = LoggerFactory.getLogger(Notification.class);

    @PostPersist //save = persis
    public void postPersist(Notification entity) throws ExecutionException, InterruptedException {
        // Update Redis cache
        logger.info("postPersist notification");
        NotifiDetailDTO notifiDetailDTO = notifiMapper.toResponse(entity);
        firebaseService.savev2(notifiDetailDTO,notifiDetailDTO.getId(), BaseConstants.COLLECTION_NOTIFICATION);

    }

}
