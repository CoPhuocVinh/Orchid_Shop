package org.jio.orchidbe.configs;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

@Configuration
public class AuctionConfig {
    @Value("${data.format}")
    private String date_format;

    @Bean
    public Properties properties(){
        Properties properties = new Properties();
        properties.setProperty("date", date_format);
        return properties;
    }
}
