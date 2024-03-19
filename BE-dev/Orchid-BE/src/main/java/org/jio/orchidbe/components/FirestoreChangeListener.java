package org.jio.orchidbe.components;/*  Welcome to Jio word
    @author: Jio
    Date: 3/19/2024
    Time: 1:04 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import com.google.cloud.firestore.DocumentChange;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.ListenerRegistration;
import com.google.firebase.cloud.FirestoreClient;
import org.jio.orchidbe.constants.BaseConstants;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
@DependsOn("firebaseInitialization")
public class FirestoreChangeListener {
    public FirestoreChangeListener() {

    }
    @PostConstruct
    public void init() {
        listenToChanges();
    }

    private void listenToChanges() {
        Firestore firestore = FirestoreClient.getFirestore();
        ListenerRegistration registration = firestore.collection(BaseConstants.COLLECTION_AUCTION)
                .addSnapshotListener((snapshots, error) -> {
                    if (error != null) {
                        System.err.println("Listen failed: " + error);
                        return;
                    }

                    if (snapshots != null && !snapshots.isEmpty()) {
                        List<DocumentChange> documentChanges = snapshots.getDocumentChanges();
                        for (DocumentChange dc : documentChanges) {
                            // Handle document changes
                            // documentChange.getType() gives you the type of change (added, modified, removed)
                            // documentChange.getDocument() gives you the document that changed
                            String auctionId = dc.getDocument().getId();
                            String productName = dc.getDocument().getString("productName");

                            switch (dc.getType()) {
                                case ADDED:
                                    System.out.println("New event added: " + auctionId + ", productName: " + productName);
                                    break;
                                case MODIFIED:
                                    System.out.println("productName changed for auction " + auctionId + ": " + productName);
                                    break;
                                case REMOVED:
                                    System.out.println("Auction removed: " + auctionId);
                                    break;
                            }
                        }
                    }
                });
    }
}