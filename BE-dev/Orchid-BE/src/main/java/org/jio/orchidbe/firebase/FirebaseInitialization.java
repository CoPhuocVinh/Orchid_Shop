package org.jio.orchidbe.firebase;/*  Welcome to Jio word
    @author: Jio
    Date: 3/16/2024
    Time: 6:23 PM
    
    ProjectName: Orchid-BE
    Ji
    o: I wish you always happy with coding <3
*/

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

@Service
@Order(1)
public class FirebaseInitialization {

    @PostConstruct
    public void initialization() {
        FileInputStream serviceAccount = null;

        try {
// BE-dev/Orchid-BE/src/main/resources
            //
            // serviceAccount = new FileInputStream("./src/main/resources/serviceAccountKey.json");
            InputStream serviceAccountStream = getClass().getResourceAsStream("/serviceAccountKey.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccountStream))
                    .build();
            FirebaseApp.initializeApp(options);

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }


    }
}
