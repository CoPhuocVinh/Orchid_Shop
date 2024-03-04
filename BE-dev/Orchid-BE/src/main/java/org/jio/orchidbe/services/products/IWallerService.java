package org.jio.orchidbe.services.products;

import org.jio.orchidbe.dtos.Wallet.WalletDTORequest;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.springframework.validation.BindingResult;

import java.io.UnsupportedEncodingException;

public interface IWallerService {
    String rechargeWallet(Long id, WalletDTORequest dto, BindingResult result) throws DataNotFoundException, UnsupportedEncodingException;
}
