package org.jio.orchidbe.constants;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Sort;

import java.util.List;

@Configuration
public class BaseConstants {
    @Autowired
    public void setEnvironment(Environment environment) {
        HOST_RETURN = environment.getProperty("HOST.URL");
    }
    public static final String SESSION_MESSAGE = "message";

    public static final String SESSION_ERROR = "error";

    public static final String DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss";

    public static final long MIN_PASSWORD_LENGTH = 8;

    public static final int DEFAULT_PAGE_NUMBER = 1;

    public static final int DEFAULT_PAGE_SIZE = 5;

    public static final int DEFAULT_MAX_PAGE_SIZE = 200;

    public static final String DEFAULT_SORT_BY = "createdAt";

    public static final Sort.Direction DEFAULT_SORT_DIRECTION = Sort.Direction.DESC;
    @Value("${HOST.URL}")
    public String HOST_URL;



    private static String HOST_RETURN ;
    //public static final String HOST_RETURN = "http://localhost:8088/api/v1";
    public static final String RETURN_PAYMENT_SUCCESS = "https://orchid-shop-iota.vercel.app/test-success?test=1";
    public static final String RETURN_PAYMENT_FAILED = "https://orchid-shop-iota.vercel.app/test-failed?test=1";
    
    public static String getHostReturn() {
        return HOST_RETURN;
    }

    public static final String COLLECTION_AUCTION = "auctions";

    public static final String COLLECTION_NOTIFICATION = "notifications";

    public static final String COLLECTION_TEST = "test";

}
