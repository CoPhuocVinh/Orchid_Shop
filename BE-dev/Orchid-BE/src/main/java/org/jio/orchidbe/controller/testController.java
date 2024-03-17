package org.jio.orchidbe.controller;/*  Welcome to Jio word
    @author: Jio
    Date: 3/12/2024
    Time: 8:27 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.jio.orchidbe.dtos.TestDTO;
import org.jio.orchidbe.responses.AuctionDetailResponse;
import org.jio.orchidbe.services.firebase.FirebaseService;
import org.jio.orchidbe.services.firebase.IFirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutionException;

@RestController
public class testController {

    @Autowired
    private IFirebaseService firebaseService;

    @GetMapping("/howdy")
    public String howdy() {
        System.out.println("/howdy");
        return "Howdy!";
    }


    @PostMapping("/firebase/save")
    public String save(@RequestBody AuctionDetailResponse response) throws ExecutionException, InterruptedException {
        return firebaseService.save(response);
    }

   /* @PostMapping("/firebase/saveV1")
    public String save(@RequestBody TestDTO response) throws ExecutionException, InterruptedException {
        return firebaseService.savev1(response);
    }*/
}
