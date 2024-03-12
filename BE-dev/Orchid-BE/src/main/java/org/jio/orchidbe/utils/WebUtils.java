package org.jio.orchidbe.utils;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class WebUtils {
    public static HttpServletRequest getCurrentRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }

    public static LocalDateTime convertToLocalDateTimeWithZone(String dateTimeString) {
        return LocalDateTime.now(ZoneId.of("Etc/GMT-7"));
    }
    public static LocalDateTime convertCurrentToLocalDateTimeWithZone(LocalDateTime dateTimeString) {
        return LocalDateTime.now(ZoneId.of("Etc/GMT-7"));
    }

}
