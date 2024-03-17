package org.jio.orchidbe.services.wallets;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jio.orchidbe.models.wallets.Transaction;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

public interface IPaymentService {


    String createPayment(Double total, String context, Long id) throws UnsupportedEncodingException;

    @Transactional
    String processPayment(String amount, String bankCode,
                          String responseCode, String orderInfo, String bankTranNo,
                          HttpServletRequest request, HttpServletResponse response) throws Exception;
}
