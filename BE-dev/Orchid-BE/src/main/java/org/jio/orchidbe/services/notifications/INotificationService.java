package org.jio.orchidbe.services.notifications;

import jakarta.transaction.Transactional;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.notifi.NotifiDetailDTO;
import org.jio.orchidbe.dtos.notifi.NotificationDTO;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.notifications.GetAllNotificationRequest;
import org.jio.orchidbe.requests.notifications.UpdateNotificationRequest;
import org.jio.orchidbe.requests.orders.GetAllOrderRequest;
import org.jio.orchidbe.requests.orders.UpdateOrderRequest;
import org.jio.orchidbe.responses.OrderResponse;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;

public interface INotificationService {
    Page<NotifiDetailDTO> getAllNotifications(GetAllNotificationRequest getAllNotificationRequest);

    @Transactional
    ResponseEntity updateNotification(UpdateNotificationRequest updateNotificationRequest, Long id,
                                      BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, DataNotFoundException, BadRequestException;

}
