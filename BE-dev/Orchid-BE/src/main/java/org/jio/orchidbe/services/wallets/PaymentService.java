package org.jio.orchidbe.services.wallets;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.jio.orchidbe.configs.PaymentConfig;
import org.jio.orchidbe.constants.BaseConstants;
import org.jio.orchidbe.exceptions.DataNotFoundException;
import org.jio.orchidbe.enums.OrderStatus;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.models.wallets.Wallet;
import org.jio.orchidbe.repositorys.products.OrderRepository;
import org.jio.orchidbe.repositorys.products.TransactionRepository;
import org.jio.orchidbe.repositorys.products.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class PaymentService implements IPaymentService{

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private WalletRepository walletRepository;

    @Override
    public String createPayment(Float total, String context, Long id) throws UnsupportedEncodingException {
        String orderType = "other";

        long amount = (long) (total * 100);

        String vnp_TxnRef = String.valueOf(id);
        String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", PaymentConfig.vnp_Version);
        vnp_Params.put("vnp_Command", PaymentConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        //vnp_Params.put("vnp_BankCode", "NCB");
        //vnp_Params.put("vnp_BankCode", "VNPAYQR");

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + context);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_ReturnUrl", PaymentConfig.vnp_Returnurl);
        vnp_Params.put("vnp_IpAddr", PaymentConfig.vnp_IpAddr);

        //Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        // Tạo một LocalDateTime từ thời gian hiện tại và múi giờ GMT+7
//        LocalDateTime now = LocalDateTime.now(ZoneId.of("Etc/GMT+7"));
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//        String vnp_CreateDate = formatter.format(cld.getTime());
        // Tạo một LocalDateTime từ thời gian hiện tại và múi giờ GMT+7
        LocalDateTime nowU = LocalDateTime.now(ZoneId.of("Etc/GMT"));

        LocalDateTime nowV1 = LocalDateTime.now();

        LocalDateTime now = LocalDateTime.now(ZoneId.of("Etc/GMT-7"));

        // Định dạng thời gian theo yêu cầu "yyyyMMddHHmmss"
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddHHmmss");
        String vnp_CreateDate = now.format(formatter);
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        // Thêm thời gian vào 15 phút
        LocalDateTime later = now.plusMinutes(15);
        String vnp_ExpireDate = later.format(formatter);
        //cld.add(Calendar.MINUTE, 15);
        //String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.vnp_HashSecret, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = PaymentConfig.vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    @Override
    @Transactional
    public String processPayment(String amount, String bankCode,
                                 String responseCode, String orderInfo, String bankTranNo,
                                 HttpServletRequest request, HttpServletResponse response) throws Exception {
        try {

            Transaction existingTrans = null;
            Float total = Float.valueOf(amount) / 100;
            //cắt chuỗi orderInfo thành 3 phần Order/wallet  - id của đối tượng đó - transaction tương ứng
            String[] parts = orderInfo.split("-");

            String type = parts[0]; // Phần đầu tiên là loại đối tượng (Order hoặc Wallet)
            String orderDetails = parts[1]; // Phần thứ hai là thông tin về đơn hàng
            String IdStr = parts[2];
            String transactionIdStr = parts[3]; // Phần thứ ba là ID của giao dịch

            Long objectId = Long.parseLong(IdStr);
            Long tranId = Long.parseLong(transactionIdStr);
            Long bankTranId = Long.parseLong(request.getParameter("vnp_TxnRef"));
//                check transacton
            if (tranId != null && tranId >= 0 && tranId.equals(bankTranId)) {
                existingTrans = transactionRepository.findById(tranId).orElseThrow(
                        () -> new DataNotFoundException("transaction id by payment not found! " + tranId)
                );
            }

            if (existingTrans.getStatus().equals(OrderStatus.CONFIRMED)){
                //throw new BadRequestException("transaction id " + existingTrans.getId() + " not true by status CONFIRMED");
                failed(response,"transaction id " + existingTrans.getId() + " not true by status CONFIRMED"
                        ,existingTrans);
                return "error";
            }

            existingTrans.setContent(orderDetails + "-" + amount);

            Map fields = new HashMap();
            for (Enumeration params = request.getParameterNames(); params.hasMoreElements(); ) {
                String fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                String fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
                if ((fieldValue != null) && (fieldValue.length() > 0)) {
                    fields.put(fieldName, fieldValue);
                }
            }
            String vnp_SecureHash = request.getParameter("vnp_SecureHash");
            if (fields.containsKey("vnp_SecureHashType")) {
                fields.remove("vnp_SecureHashType");
            }
            if (fields.containsKey("vnp_SecureHash")) {
                fields.remove("vnp_SecureHash");
            }

            // Check checksum
            String signValue = PaymentConfig.hashAllFields(fields);
            if (signValue.equals(vnp_SecureHash)) {

                if (responseCode.equals("00")) {

                    if (type.contains("Order")) {
                        // Cập nhật trạng thái của đơn hàng và giao dịch
                        // (Đã giả sử rằng order và transaction có các phương thức tương ứng để cập nhật trạng thái)
                        Order existingOrder = orderRepository.findById(objectId).orElseThrow(
                                () -> new DataNotFoundException("order id by payment not found! " + objectId)
                        );
                        // check status
                        if (!existingOrder.getStatus().equals(OrderStatus.CONFIRMED)) {
                            // check total of bank == total of database (order)

                            if (existingOrder.getTotal().equals(total)) {
                                existingOrder.setStatus(OrderStatus.CONFIRMED);

                                existingTrans.setResource(bankTranNo);
                                existingTrans.setStatus(OrderStatus.CONFIRMED);
                                existingTrans.setContent(orderDetails + "-" + amount);
                            } else {
                                // error

                                failed(response,"amount not true",existingTrans);
                                return "error";
                            }
                        } else {
                            //throw new BadRequestException("order id " + existingOrder.getId() + " not true by status CONFIRMED");

                            failed(response,"order id " + existingOrder.getId() + " not true by status CONFIRMED"
                                    ,existingTrans);
                            return "error";
                        }


                    } else if (type.contains("Wallet")) {
                        //Nếu phần đầu là Wallet thì cập nhật số dư = số dư + amount và cập nhật transaction là CONFIRMED
                        Wallet existingWallet = walletRepository.findById(objectId).orElseThrow(
                                () -> new DataNotFoundException("wallet id by payment not found! " + objectId)
                        );

                        Float balance = existingWallet.getBalance() + total;
                        existingWallet.setBalance(balance);

                        existingTrans.setResource(bankTranNo);
                        existingTrans.setStatus(OrderStatus.CONFIRMED);
                        existingTrans.setContent(orderDetails + "-" + amount);

                    }

                    System.out.println("Thanh toán thành công");
                    String url = BaseConstants.RETURN_PAYMENT_SUCCESS;
                    response.sendRedirect(url);
                    return "win"; // Redirect về trang FrontEnd
                    // https://orchid-shop-iota.vercel.app/


                } else {
                    if (type.contains("Order")) {
                        Order existingOrder = orderRepository.findById(objectId).orElseThrow(
                                () -> new DataNotFoundException("order id by payment not found! " + objectId)
                        );
                        //Order existingOrder = order1.get();
                        existingOrder.setStatus(OrderStatus.PENDING);
                    }
                    // Xử lý thất bại
                    existingTrans.setStatus(OrderStatus.FAILED);
                    response.sendRedirect(BaseConstants.RETURN_PAYMENT_FAILED);
                    System.out.println("Thanh toán thất bại");
                    return "fail";
                }

            }
            failed(response,"error can not hash",existingTrans);
            return "error";


        } catch (Exception e) {
            throw new Exception("Error at processPayment: " + e.getMessage());
        }
    }


    private String failed(HttpServletResponse response, String msg,Transaction transaction) throws IOException {
        transaction.setStatus(OrderStatus.FAILED);
        //transaction.setResource(bankTranNo);
        transaction.setFailedReason(msg);
        String url = BaseConstants.RETURN_PAYMENT_FAILED+"&msg="+msg;
        response.sendRedirect(url);
        return url;

    }
}
