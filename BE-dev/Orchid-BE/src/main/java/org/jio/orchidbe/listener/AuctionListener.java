package org.jio.orchidbe.listener;/*  Welcome to Jio word
    @author: Jio
    Date: 3/19/2024
    Time: 7:11 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.persistence.PostPersist;
import jakarta.persistence.PostUpdate;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.jio.orchidbe.models.Notification;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.users.User;
import org.jio.orchidbe.models.users.user_enum.UserRole;
import org.jio.orchidbe.repositorys.notifis.NotificationRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.services.firebase.IFirebaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Component
public class AuctionListener {


    private IFirebaseService firebaseService;

    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(AuctionListener.class);
    @PostUpdate

    public void postUpdate(Auction entity) {
        // Update Redis cache
        logger.info("postUpdate");

    }
    @PostPersist //save = persis
    public void postPersist(Auction entity) {
        // Update Redis cache
        logger.info("postPersist");

    }


}
