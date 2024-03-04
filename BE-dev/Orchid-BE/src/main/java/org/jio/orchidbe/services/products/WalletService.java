package org.jio.orchidbe.services.products;

import org.jio.orchidbe.dtos.Wallet.WalletDTORequest;
import org.jio.orchidbe.enums.TypeTrans;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.models.orders.PaymentMethod;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.models.wallets.Wallet;
import org.jio.orchidbe.repositorys.products.TransactionRepository;
import org.jio.orchidbe.repositorys.products.WalletRepository;
import org.jio.orchidbe.utils.GenerateCodeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.io.UnsupportedEncodingException;

@Service
public class WalletService implements IWallerService{
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private PaymentService paymentService;
    @Override
    public String rechargeWallet(Long id, WalletDTORequest dto, BindingResult result) throws DataNotFoundException, UnsupportedEncodingException {
        Wallet wallet = walletRepository.findById(id).orElseThrow(
                () -> new DataNotFoundException("wallet not found with id: " + id)
        );
        // Tạo một transaction mới
        String tranCode = GenerateCodeUtils.generateCode4Transaction(TypeTrans.NT, String.valueOf(wallet.getId()),wallet.getUser().getId());

        Transaction transaction = Transaction.builder()
                .wallet(wallet)

                .amount(dto.getRecharge()) // Giả sử giá trị thanh toán là tổng số tiền đơn hàng
                .status(OrderStatus.PENDING) // Trạng thái của giao dịch là chờ xử lý ban đầu
                .paymentMethod(PaymentMethod.BANK)
                .transactionCode(tranCode)
                .build();
        transactionRepository.save(transaction);
        String vnpayUrl =handleVNPayPayment(wallet,transaction,dto.getRecharge());
        return vnpayUrl;
    }

    private String handleVNPayPayment(Wallet wallet, Transaction transaction,Float total) throws UnsupportedEncodingException {
        // Gọi phương thức generatePaymentUrl từ paymentService và trả về URL thanh toán VNPay
        String context = "Wallet-"+ wallet.getUser().getName()+ "-"+ wallet.getId() + "-" +transaction.getId();

        return paymentService.createPayment(total, context, transaction.getId() );
    }
}
