package org.jio.orchidbe.requests.logins;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LoginGoogleRequest {
    private String email;
    private String avatar;
    private String name;
}
