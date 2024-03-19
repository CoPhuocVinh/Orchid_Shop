package org.jio.orchidbe.controller.payments;/*  Welcome to Jio word
    @author: Jio
    Date: 3/12/2024
    Time: 1:04 AM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.wallets.GetAllTransactionResquest;
import org.jio.orchidbe.dtos.wallets.TransactionResponseWrapper;
import org.jio.orchidbe.dtos.wallets.TransactionsResponse;
import org.jio.orchidbe.requests.auctions.GetAllAuctionResquest;
import org.jio.orchidbe.responses.GetAuctionResponse;
import org.jio.orchidbe.services.wallets.ITransactionService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("${api.prefix}/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final ITransactionService transactionService;

//    @GetMapping("")

    @GetMapping("")
    @Operation(security = { @SecurityRequirement(name = "bearer-key") })
    public ResponseEntity<?> getTransactions(@ModelAttribute GetAllTransactionResquest request){
        ApiResponse apiResponse = new ApiResponse();
        HashMap<String, Object> megaData = new HashMap<>();

        Double total = 0d;
        TransactionResponseWrapper wrapper = transactionService.getAll(request,total);
        megaData.put("total",wrapper.getTotal());
        apiResponse.ok(wrapper.getTransactionPage(), megaData);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }

}
