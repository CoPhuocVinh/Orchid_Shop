package org.jio.orchidbe.controller.notifications;


import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.notifi.NotifiDetailDTO;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.feedbacks.GetAllFeedbackRequest;
import org.jio.orchidbe.requests.feedbacks.UpdateFeedbackRequest;
import org.jio.orchidbe.requests.notifications.GetAllNotificationRequest;
import org.jio.orchidbe.requests.notifications.UpdateNotificationRequest;
import org.jio.orchidbe.responses.FeedbackResponse;
import org.jio.orchidbe.services.feedbacks.IFeedbackService;
import org.jio.orchidbe.services.notifications.INotificationService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final INotificationService notificationService;
    private final ValidatorUtil validatorUtil;


    @GetMapping("list")
    public ResponseEntity<?> getFeedbacks(@ModelAttribute GetAllNotificationRequest getAllNotificationRequest){
        ApiResponse apiResponse = new ApiResponse();

        Page<NotifiDetailDTO> NTPage = notificationService.getAllNotifications(getAllNotificationRequest);
        apiResponse.ok(NTPage);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

    @PutMapping("update/{id}")
    public ResponseEntity updateReply(@PathVariable("id") Long id,
                                      @RequestBody UpdateNotificationRequest updateNotificationRequest,
                                      BindingResult bindingResult) throws ChangeSetPersister.NotFoundException, DataNotFoundException, BadRequestException {

        return notificationService.updateNotification(updateNotificationRequest, id, bindingResult);
    }

}
