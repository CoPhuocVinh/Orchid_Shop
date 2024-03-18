package org.jio.orchidbe.services.firebase;/*  Welcome to Jio word
    @author: Jio
    Date: 3/16/2024
    Time: 10:49 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.responses.AuctionDetailResponse;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface IFirebaseService<T> {

    //    @Autowired
    //    private Firestore dbFirestore;
    String save(AuctionDetailResponse saveObj) throws ExecutionException, InterruptedException;

    public String savev2(T saveObj, Long id, String collectionName) throws ExecutionException, InterruptedException;

    AuctionDetailResponse getAuctionByKey(String key, String collectionName) throws ExecutionException, InterruptedException;

    Boolean delete(String key, String Collection) throws ExecutionException, InterruptedException;

    List<AuctionDetailResponse> getAuctions(String collectionName) throws ExecutionException, InterruptedException;
}
