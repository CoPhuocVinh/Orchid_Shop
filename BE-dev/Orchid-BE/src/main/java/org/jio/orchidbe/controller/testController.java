package org.jio.orchidbe.controller;/*  Welcome to Jio word
    @author: Jio
    Date: 3/12/2024
    Time: 8:27 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testController {
    @GetMapping("/howdy")
    public String howdy() {
        System.out.println("/howdy");
        return "Howdy!";
    }
}
