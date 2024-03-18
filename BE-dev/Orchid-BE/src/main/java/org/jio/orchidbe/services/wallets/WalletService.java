package org.jio.orchidbe.services.wallets;

import org.jio.orchidbe.dtos.wallets.WalletDTORequest;
import org.jio.orchidbe.dtos.wallets.WalletDTOResponse;
import org.jio.orchidbe.enums.TypeTrans;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.mappers.wallets.WalletMapper;
import org.jio.orchidbe.models.orders.PaymentMethod;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.models.wallets.Wallet;
import org.jio.orchidbe.repositorys.wallets.TransactionRepository;
import org.jio.orchidbe.repositorys.wallets.WalletRepository;
import org.jio.orchidbe.repositorys.users.UserRepository;
import org.jio.orchidbe.utils.GenerateCodeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.io.UnsupportedEncodingException;

@Service
public class WalletService implements IWallerService {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private WalletRepository walletRepository;
    @Autowired
    private IPaymentService paymentService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private WalletMapper walletMapper;

    @Override
    public String rechargeWallet(Long id, WalletDTORequest dto, BindingResult result) throws DataNotFoundException, UnsupportedEncodingException {

        if (!userRepository.existsById(id) ){
            throw new DataNotFoundException("wallet not found with user id: " + id);
        }

        Wallet wallet = walletRepository.findByUser_Id(id).orElseThrow(
                () -> new DataNotFoundException("wallet not found with user id: " + id)
        );
        // Tạo một transaction mới
        String tranCode = GenerateCodeUtils.generateCode4Transaction(TypeTrans.NT, String.valueOf(wallet.getId()), id);

        Transaction transaction = Transaction.builder()
                .wallet(wallet)

                .amount(dto.getRecharge()) // Giả sử giá trị thanh toán là tổng số tiền đơn hàng
                .status(OrderStatus.PENDING) // Trạng thái của giao dịch là chờ xử lý ban đầu
                .paymentMethod(PaymentMethod.BANK)
                .transactionCode(tranCode)
                .build();
        transactionRepository.save(transaction);
        String vnpayUrl = handleVNPayPayment(wallet, transaction, dto.getRecharge());
        return vnpayUrl;
    }

    @Override
    public WalletDTOResponse getBalanceByUserId(Long id) throws DataNotFoundException {
        if (!userRepository.existsById(id) ){
            throw new DataNotFoundException("wallet not found with user id: " + id);
        }

        Wallet wallet = walletRepository.findByUser_Id(id).orElseThrow(
                () -> new DataNotFoundException("wallet not found with user id: " + id)
        );

        return walletMapper.toResponse(wallet);
    }

    private String handleVNPayPayment(Wallet wallet, Transaction transaction, Double total) throws UnsupportedEncodingException {
        // Gọi phương thức generatePaymentUrl từ paymentService và trả về URL thanh toán VNPay
        String context = "Wallet-" + wallet.getUser().getName() + "-" + wallet.getId() + "-" + transaction.getId();

        return paymentService.createPayment(total, context, transaction.getId());
    }
}
