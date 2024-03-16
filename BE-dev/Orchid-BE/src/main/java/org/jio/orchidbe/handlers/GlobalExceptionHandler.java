package org.jio.orchidbe.handlers;



import org.apache.coyote.BadRequestException;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.exceptions.OptimisticException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.NotAcceptableStatusException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice // Chỉ định lớp này xử lý ngoại lệ chung
public class GlobalExceptionHandler {

    Map<String, String> error = new HashMap<>();
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ResponseEntity<ApiResponse> handleGeneralException(Exception exception) {
        error.put("errorCode", "500");
        error.put("errorStatus", "INTERNAL_SERVER_ERROR");
        error.put("errorMessage", exception.getMessage());
        exception.printStackTrace();
        return ResponseEntity.internalServerError().body(
                ApiResponse.builder()
                        .error(error)
                        .build()
        );
    }
    @ExceptionHandler(DataNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<?> handleResourceNotFoundException(DataNotFoundException exception) {
        error.put("errorCode", "404");
        error.put("errorStatus", "NOT_FOUND");
        error.put("errorMessage", exception.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ApiResponse.builder()
                        .error(error)
                        .build());
    }

    @ExceptionHandler(OptimisticException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    @ResponseBody
    public ApiResponse handleOptimisticException(OptimisticException ex) {
        error.put("errorCode", "409");
        error.put("errorStatus", "CONFLICT");
        error.put("errorMessage", ex.getMessage());

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.error(error);
        return apiResponse;
    }

    @ExceptionHandler(NotAcceptableStatusException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ResponseBody
    public ApiResponse handleNotAcceptableStatusException(NotAcceptableStatusException ex) {
        error.put("errorCode", "406");
        error.put("errorStatus", "NOT_ACCEPTABLE");
        error.put("errorMessage", ex.getMessage());

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.error(error);
        return apiResponse;
    }

    @ExceptionHandler(BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiResponse handleBadRequestException(BadRequestException ex) {
        error.put("errorCode", "400");
        error.put("errorStatus", "BAD_REQUEST");
        error.put("errorMessage", ex.getMessage());

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.error(error);
        return apiResponse;
    }

}
