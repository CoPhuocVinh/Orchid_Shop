package org.jio.orchidbe.controller.payments;/*  Welcome to Jio word
    @author: Jio
    Date: 2/28/2024
    Time: 3:18 PM
    
    ProjectName: Orchid-BE
    Jio: I wish you always happy with coding <3
*/

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.configs.PaymentConfig;
import org.jio.orchidbe.services.wallets.IPaymentService;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("${api.prefix}/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final IPaymentService paymentService;

    @GetMapping("/create_payment")
    public String payment(HttpSession session, HttpServletResponse response
            , @RequestParam int id, Model model) throws UnsupportedEncodingException {

        //Optional<Discount> discountEntity = discountService.findById(discountID);

        //ResponseEntity<?>
        String orderType = "billpayment";
//        long amount = Integer.parseInt(req.getParameter("amount"))*100;
//        String bankCode = req.getParameter("bankCode");

        //float price_discount = discountEntity.get().getAPackage().getPrice() * (100 - discountEntity.get().getPercentDiscount()) * discountEntity.get().getTimeOnMonth();

        long amount = (long) 1000000;

        //String vnp_TxnRef = PaymentConfig.getRandomNumber(8);
        String vnp_TxnRef = String.valueOf(id);
        //String vnp_IpAddr = Config.getIpAddress(req);
        String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", PaymentConfig.vnp_Version);
        vnp_Params.put("vnp_Command", PaymentConfig.vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_BankCode", "NCB");
        vnp_Params.put("vnp_Locale", "vn");
//        if (bankCode != null && !bankCode.isEmpty()) {
//            vnp_Params.put("vnp_BankCode", bankCode);
//        }

        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        //String locate = req.getParameter("language");
//        if (locate != null && !locate.isEmpty()) {
//            vnp_Params.put("vnp_Locale", locate);
//        } else {
//            vnp_Params.put("vnp_Locale", "vn");
//        }

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
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
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
        System.out.println(paymentUrl);
//
//        PaymentDTO paymentDTO = PaymentDTO.builder()
//                .status("Ok")
//                .message("success")
//                .URL(paymentUrl)
//                .build();

        return "redirect:" + paymentUrl;
        //return ResponseEntity.status(HttpStatus.OK).body(paymentDTO);
    }

    // /FYoGa/Course/PackageCheckOut/payment
    @Transactional
    @RequestMapping(value = "/return", method = RequestMethod.GET)
    public String processPayment(@RequestParam("vnp_Amount") String amount,
                                 @RequestParam("vnp_BankCode") String bankCode,
                                 @RequestParam("vnp_ResponseCode") String responseCode,
                                 @RequestParam("vnp_OrderInfo") String order,
                                 @RequestParam(value = "vnp_BankTranNo", defaultValue = "no_value") String bankTranNo,
                                 HttpServletResponse response,
                                 HttpServletRequest request) throws Exception {

        return paymentService.processPayment(amount,bankCode,responseCode,order,bankTranNo, request,response);
        //RegisterDTO registerDTO = (RegisterDTO) session.getAttribute("REGISTER");
        //Account account = (Account) session.getAttribute("USER");
        //Optional<Discount> discountEntity = discountService.findById(registerDTO.getADiscountID());



    }


}
