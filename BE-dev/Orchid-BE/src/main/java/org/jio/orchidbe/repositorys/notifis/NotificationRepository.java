package org.jio.orchidbe.repositorys.notifis;/*  Welcome to Jio word
    @author: Jio
    Date: 3/18/2024
    Time: 4:21 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.models.Notification;
import org.jio.orchidbe.models.auctions.Auction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Range;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    Page<Notification> findAll(Specification<Notification> specification, Pageable pageable);

    Boolean existsByMsgAndUser_Id(String msg, Long userId);

}
