package org.jio.orchidbe.utils;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import lombok.*;
import org.apache.http.client.fluent.Form;
import org.apache.http.client.fluent.Request;
import org.jio.orchidbe.constants.GoogleConstants;


public class GoogleUtils {

    @SneakyThrows
    public static String getToken(final String code) {
        String response = Request.Post(GoogleConstants.GOOGLE_LINK_GET_TOKEN)
                .bodyForm(Form.form().add("client_id", GoogleSettings.CLIENT_ID)
                        .add("client_secret", GoogleSettings.CLIENT_ID)
                        .add("redirect_uri", GoogleConstants.GOOGLE_REDIRECT_URI)
                        .add("code", code)
                        .add("grant_type", GoogleConstants.GOOGLE_GRANT_TYPE).build())
                .execute().returnContent().asString();
        JsonObject jobj = new Gson().fromJson(response, JsonObject.class);
        String accessToken = jobj.get("access_token").toString().replaceAll("\"", "");
        return accessToken;
    }

    @SneakyThrows
    public static GooglePojo getUserInfo(final String accessToken) {
        String link = GoogleConstants.GOOGLE_LINK_GET_USER_INFO + accessToken;
        String response = Request.Get(link).execute().returnContent().asString();
        GooglePojo googlePojo = new Gson().fromJson(response, GooglePojo.class);
        System.out.println(googlePojo);
        return googlePojo;
    }

    public static String getLoginUrl() {
        String clientId = GoogleSettings.CLIENT_ID;
        String redirectUri = GoogleConstants.GOOGLE_REDIRECT_URI;
        return "https://accounts.google.com/o/oauth2/auth?scope=email&redirect_uri=" + redirectUri + "&response_type=code&client_id=" + clientId + "&approval_prompt=force";
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class GooglePojo {

        private String id;
        private String email;

        @JsonProperty("verified_email")
        private boolean verifiedEmail;
        private String name;

        @JsonProperty("given_name")
        private String givenName;

        @JsonProperty("family_name")
        private String familyName;

        private String link;

        private String picture;
    }

}
