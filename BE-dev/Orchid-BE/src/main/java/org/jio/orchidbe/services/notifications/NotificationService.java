package org.jio.orchidbe.services.notifications;

import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.notifi.NotifiDetailDTO;
import org.jio.orchidbe.dtos.notifi.NotificationDTO;
import org.jio.orchidbe.enums.FBStatus;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.jio.orchidbe.mappers.notifi.NotifiMapper;
import org.jio.orchidbe.models.Notification;
import org.jio.orchidbe.models.feedbacks.Feedbacks;
import org.jio.orchidbe.repositorys.notifis.NotificationRepository;
import org.jio.orchidbe.requests.notifications.GetAllNotificationRequest;
import org.jio.orchidbe.requests.notifications.UpdateNotificationRequest;
import org.jio.orchidbe.responses.FeedbackResponse;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.validation.BindingResult;

import java.lang.reflect.Field;

@Service
public class NotificationService implements INotificationService{
    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private NotifiMapper notifiMapper;
    @Autowired
    private ValidatorUtil validatorUtil;

    @Override
    public Page<NotifiDetailDTO> getAllNotifications(GetAllNotificationRequest getAllNotificationRequest) {
        return notificationRepository.findAll(getAllNotificationRequest.getSpecification(), getAllNotificationRequest.getPageable())
                .map(notifiMapper::toResponse);
    }

    @Override
    public ResponseEntity updateNotification(UpdateNotificationRequest updateNotificationRequest, Long id, BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, DataNotFoundException, BadRequestException {
        ApiResponse apiResponse = new ApiResponse();
        if (bindingResult.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        final Notification nt = notificationRepository.findById(id).orElseThrow(
                () -> new ChangeSetPersister.NotFoundException()
        );

        try {
            // đổ data theo field
            ReflectionUtils.doWithFields(updateNotificationRequest.getClass(), field -> {
                field.setAccessible(true); // Đảm bảo rằng chúng ta có thể truy cập các trường private
                Object newValue = field.get(updateNotificationRequest);
                if (newValue != null) { // lấy các giá trị không null
                    String fieldName = field.getName();
                    Field existingField = ReflectionUtils.findField(nt.getClass(), fieldName);
                    if (existingField != null) {
                        existingField.setAccessible(true);
                        ReflectionUtils.setField(existingField, nt, newValue);
                    }
                }
            });
            nt.setReaded(true);

            Notification updateNt = notificationRepository.save(nt);

            NotifiDetailDTO ntResponse = notifiMapper.toResponse(updateNt);
            apiResponse.ok(ntResponse);
            return new ResponseEntity<>(apiResponse, HttpStatus.OK);
        } catch (OptimisticLockingFailureException ex) {
            throw new OptimisticException("Data is updated by another user!");
        } catch (DataIntegrityViolationException e) {
            if (bindingResult.hasErrors()) {
                apiResponse.error(validatorUtil.handleValidationErrors(bindingResult.getFieldErrors()));
                return ResponseEntity.badRequest().body(apiResponse);
            }
            throw new DataIntegrityViolationException("Contract data");
        }
    }

}
