package org.jio.orchidbe.configs;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.jio.orchidbe.models.users.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ToString
public class SecurityUser implements OAuth2User {

    private static final long serialVersionUID = 1L;

    private User user;

    private Map<String, Object> attributes;

    public SecurityUser(User user) {
        this.user = user;
    }

    public SecurityUser(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return null;
    }
}