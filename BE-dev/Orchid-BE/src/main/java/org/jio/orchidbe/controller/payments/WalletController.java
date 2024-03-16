package org.jio.orchidbe.controller.payments;/*  Welcome to Jio word
    @author: Jio
    Date: 3/3/2024
    Time: 11:26 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.dtos.wallets.WalletDTORequest;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.dtos.wallets.WalletDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.services.wallets.IWallerService;
import org.jio.orchidbe.utils.ValidatorUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequestMapping("${api.prefix}/wallets")
@RequiredArgsConstructor
public class WalletController {
    private final ValidatorUtil validatorUtil;
    private final IWallerService wallerService;
    @PostMapping("/recharge-wallet-by-userId/{id}")
    public ResponseEntity<?> rechargeWallet(
            @PathVariable Long id,
            @Valid @RequestBody WalletDTORequest dto,
            BindingResult result
    ) throws DataNotFoundException, UnsupportedEncodingException {
        ApiResponse apiResponse = new ApiResponse();
        if (result.hasErrors()) {
            apiResponse.error(validatorUtil.handleValidationErrors(result.getFieldErrors()));
            return ResponseEntity.badRequest().body(apiResponse);
        }

        String vnpayURL = wallerService.rechargeWallet(id,dto,result);
        apiResponse.ok( vnpayURL);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);

    }

    //get balance
    @GetMapping("/get-balance-by-userId/{id}")
    public ResponseEntity<?> getBalanceByUserId(@PathVariable Long id) throws DataNotFoundException {
        ApiResponse apiResponse = new ApiResponse();
        WalletDTOResponse response = wallerService.getBalanceByUserId(id);
        apiResponse.ok(response);
        return new ResponseEntity<>(apiResponse, HttpStatus.OK);
    }


}
