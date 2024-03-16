package org.jio.orchidbe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class OrchidBeApplication {
    public static void main(String[] args) {
        SpringApplication.run(OrchidBeApplication.class, args);
    }

}
