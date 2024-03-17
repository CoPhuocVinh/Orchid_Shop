package org.jio.orchidbe.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;

@Getter
@Setter
public class GoogleSettings {

    @Value("${google.client_id}")
    private String clientId;


    @Value("${google.client_secret}")
    private String clientSecret;

    public static String CLIENT_ID;

    public static String CLIENT_SECRET;

    @Value("${google.client_id}")
    public void setClientId(String clientId) {
        GoogleSettings.CLIENT_ID = clientId;
    }

    @Value("${google.client_secret}")
    public void setClientSecret(String clientSecret) {
        GoogleSettings.CLIENT_SECRET = clientSecret;
    }
}
