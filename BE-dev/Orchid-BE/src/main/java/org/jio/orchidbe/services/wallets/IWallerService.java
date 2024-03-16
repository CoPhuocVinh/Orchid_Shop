package org.jio.orchidbe.services.wallets;

import org.jio.orchidbe.dtos.wallets.WalletDTORequest;
import org.jio.orchidbe.dtos.wallets.WalletDTOResponse;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.springframework.validation.BindingResult;

import java.io.UnsupportedEncodingException;

public interface IWallerService {
    String rechargeWallet(Long id, WalletDTORequest dto, BindingResult result) throws DataNotFoundException, UnsupportedEncodingException;

    WalletDTOResponse getBalanceByUserId(Long id) throws DataNotFoundException;
}
