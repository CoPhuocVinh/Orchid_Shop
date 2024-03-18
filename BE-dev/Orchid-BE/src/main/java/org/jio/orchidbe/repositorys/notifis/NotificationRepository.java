package org.jio.orchidbe.repositorys.notifis;/*  Welcome to Jio word
    @author: Jio
    Date: 3/18/2024
    Time: 4:21 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.models.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
}
