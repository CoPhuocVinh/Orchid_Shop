package org.jio.orchidbe.services.firebase;/*  Welcome to Jio word
    @author: Jio
    Date: 3/16/2024
    Time: 6:40 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;

import com.google.firebase.cloud.FirestoreClient;
import org.jio.orchidbe.constants.BaseConstants;
import org.jio.orchidbe.dtos.TestDTO;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.responses.AuctionDetailResponse;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ExecutionException;

import static org.jio.orchidbe.constants.BaseConstants.COLLECTION_AUCTION;
@Service
public class FirebaseService<T> implements IFirebaseService<T> {

//    @Autowired
//    private Firestore dbFirestore;
    @Override
    public String save(AuctionDetailResponse saveObj) throws ExecutionException, InterruptedException {
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_AUCTION).document(String.valueOf(saveObj.getId())).set(saveObj);
            return collectionApiFuture.get().getUpdateTime().toString();
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
        }

        return "bibi";
    }

    public String savev1(TestDTO saveObj) throws ExecutionException, InterruptedException {
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_AUCTION).document(String.valueOf(saveObj.getName())).set(saveObj);
            return collectionApiFuture.get().getUpdateTime().toString();
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
        }

        return "bibi";
    }
    @Override
    public String savev2(T saveObj, Long id, String collectionName) throws ExecutionException, InterruptedException {
        try {
            //Firestore dbFirestore = FirestoreClient.getFirestore();
            Firestore dbFirestore = FirestoreClient.getFirestore();
            ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(collectionName).document(String.valueOf(id )).set(saveObj);
            return collectionApiFuture.get().getUpdateTime().toString();
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
        }

        return "bibi";
    }

    @Override
    public AuctionDetailResponse getAuctionByKey(String key, String collectionName) throws ExecutionException, InterruptedException {
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();

            DocumentReference documentReference = dbFirestore.collection(collectionName).document(key);

            ApiFuture<DocumentSnapshot> future = documentReference.get();

            DocumentSnapshot documentSnapshot = future.get();
            AuctionDetailResponse response = null;
            if (documentSnapshot.exists()){
                response = documentSnapshot.toObject(AuctionDetailResponse.class);
                return response;
            }else {
                //throw new DataNotFoundException("Not found live auction with id" + key);
            }

        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
        return null;
    }


    @Override
    public Boolean delete(String key, String Collection) throws ExecutionException, InterruptedException {
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();
            ApiFuture<WriteResult> collectionApiFuture = dbFirestore.collection(COLLECTION_AUCTION).document(key).delete();
            return true;
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
        }

        return false;
    }

    @Override
    public List<AuctionDetailResponse> getAuctions(String collectionName) throws ExecutionException, InterruptedException {
        try {
            Firestore dbFirestore = FirestoreClient.getFirestore();

            Iterable<DocumentReference> documentReferences = dbFirestore.collection(collectionName).listDocuments();

            Iterator<DocumentReference> iterator = documentReferences.iterator();

            List<AuctionDetailResponse> auctionDetailResponses = new ArrayList<>();
            AuctionDetailResponse response = null;
            while (iterator.hasNext()){
                DocumentReference documentReference  = iterator.next();
                ApiFuture<DocumentSnapshot> future = documentReference.get();
                DocumentSnapshot documentSnapshot = future.get();
                response = documentSnapshot.toObject(AuctionDetailResponse.class);
                auctionDetailResponses.add(response);
            }
            return auctionDetailResponses;

        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e.getMessage());
        }
        return null;
    }

    public void testListener(){
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference auctionsRef = db.collection(COLLECTION_AUCTION);
        // Thêm SnapshotListener để theo dõi sự thay đổi trong các tài liệu của users
        auctionsRef.addSnapshotListener((snapshots, e) -> {
            if (e != null) {
                System.err.println("Listen failed: " + e);
                return;
            }
            for (DocumentChange dc : snapshots.getDocumentChanges()) {
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
        });
    }
}