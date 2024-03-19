package org.jio.orchidbe.services.users;

import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.requests.logins.LoginGoogleRequest;

public interface ILoginService {

     String handleGoogleLogin(LoginGoogleRequest loginGoogleRequest) throws Exception;
}
