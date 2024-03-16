package org.jio.orchidbe.utils;

import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class ValidatorUtil {
    public Map<String, String> handleValidationErrors(List<FieldError> fieldErrors) {
        Map<String, String> errors = new HashMap<>();
        if (fieldErrors != null) {
            for (FieldError fieldError : fieldErrors) {
                errors.put(fieldError.getField(), fieldError.getDefaultMessage());
            }
        }
        return errors;
    }
}
