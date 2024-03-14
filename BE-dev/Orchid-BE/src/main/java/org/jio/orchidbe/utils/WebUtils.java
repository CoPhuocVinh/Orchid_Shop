package org.jio.orchidbe.utils;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

public class WebUtils {
    public static HttpServletRequest getCurrentRequest() {
        return ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
    }

//    public static LocalDateTime convertCurrentToLocalDateTimeWithZone() {
//        return ZonedDateTime.now(ZoneId.of("Etc/GMT-7")).toLocalDateTime();
//    public static LocalDateTime convertToLocalDateTimeWithZone(String dateTimeString) {
//        // Định dạng của chuỗi
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS");
//
//
//        LocalDateTime dateTime = null;
//        try {
//            // Chuyển đổi chuỗi thành LocalDateTime
//            dateTime = LocalDateTime.parse(dateTimeString, formatter);
//            System.out.println("LocalDateTime: " + dateTime);
//        } catch (Exception e) {
//            System.out.println("Không thể chuyển đổi chuỗi thành LocalDateTime: " + e.getMessage());
//        }
//
//        return dateTime;
//    }
    public static LocalDateTime convertCurrentToLocalDateTimeWithZone() {
        //System.out.println( "test = = = = =  " + LocalDateTime.now(ZoneId.of("Etc/GMT-7")));

        return LocalDateTime.now(ZoneId.of("Etc/GMT-7"));

    }

}
