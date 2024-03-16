package org.jio.orchidbe.utils;/*  Welcome to Jio word
    @author: Jio
    Date: 3/3/2024
    Time: 11:43 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.enums.TypeTrans;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class GenerateCodeUtils {
    public static String generateResource4Wallet(Long walletId, String productCode){
        LocalDateTime currentTime = LocalDateTime.now();
        String formattedTime = currentTime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));
        String resource = productCode + "-" + walletId + "-" + formattedTime;

        return resource;
    }

    public static String generateCode4Transaction(TypeTrans type, String context, Long userId){
        LocalDateTime currentTime = LocalDateTime.now();
        String formattedTime = currentTime.format(DateTimeFormatter.ofPattern("yyyyMMddHHmm"));
        String resource = type + "-" + formattedTime + "-" + context + "-"+userId;

        return resource;
    }
}
