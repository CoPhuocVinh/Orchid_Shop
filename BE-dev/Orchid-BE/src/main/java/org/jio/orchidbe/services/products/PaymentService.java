package org.jio.orchidbe.services.products;

import org.jio.orchidbe.configs.PaymentConfig;
import org.jio.orchidbe.models.OrderStatus;
import org.jio.orchidbe.models.orders.Order;
import org.jio.orchidbe.models.wallets.Transaction;
import org.jio.orchidbe.repositorys.products.OrderRepository;
import org.jio.orchidbe.repositorys.products.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    public String createPayment(Float total, String context) throws UnsupportedEncodingException {
        String orderType = "billpayment";

        long amount = (long) (total *100);

        String vnp_TxnRef = context;
        String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", PaymentConfig.vnp_Version);
        vnp_Params.put("vnp_Command", PaymentConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);
        vnp_Params.put("vnp_ReturnUrl", PaymentConfig.vnp_Returnurl);
        vnp_Params.put("vnp_IpAddr", PaymentConfig.vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
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

    public String processPayment(String amount, String bankCode, String responseCode, String orderInfo) {

        //cắt chuỗi orderInfo thành 3 phần Order/wallet  - id của đối tượng đó - transaction tương ứng
        String[] parts = orderInfo.split("-");

        String type = parts[0]; // Phần đầu tiên là loại đối tượng (Order hoặc Wallet)
        String orderDetails = parts[1]; // Phần thứ hai là thông tin về đơn hàng
        String orderIdStr = parts[2];
        String transactionIdStr = parts[3]; // Phần thứ ba là ID của giao dịch


        Long orderId = Long.parseLong(orderIdStr);
        Long tranId = Long.parseLong(transactionIdStr);
        if (responseCode.equals("00")) {
            if (type.equals("Order")) {
                // Cập nhật trạng thái của đơn hàng và giao dịch
                // (Đã giả sử rằng order và transaction có các phương thức tương ứng để cập nhật trạng thái)
                Optional<Order> order1= orderRepository.findById(orderId);
                Order existingOrder = order1.get();
                existingOrder.setStatus(OrderStatus.CONFIRMED);

                Optional<Transaction> trans= transactionRepository.findById(tranId);
                Transaction existingTrans = trans.get();
                existingTrans.setStatus(OrderStatus.CONFIRMED);

                System.out.println("Cập nhật trạng thái đơn hàng và giao dịch thành CONFIRMED");
            } else if (type.equals("Wallet")) {
                //Nếu phần đầu là Wallet thì cập nhật  số dư = số dư + amount và cập nhật transaction là CONFIRMED
            }

            System.out.println("Thanh toán thành công");
            return "win"; // Redirect về trang FrontEnd

        } else {
            // Xử lý thất bại
            System.out.println("Thanh toán thất bại");
            return "fail";
        }
    }
}
