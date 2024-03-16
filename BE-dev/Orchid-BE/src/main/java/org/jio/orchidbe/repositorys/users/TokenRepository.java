package org.jio.orchidbe.repositorys.users;



import org.jio.orchidbe.models.users.Token;
import org.jio.orchidbe.models.users.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByUser(User user);
    Token findByToken(String token);
    Token findByRefreshToken(String token);
}

