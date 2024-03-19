package org.jio.orchidbe.components.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.jio.orchidbe.dtos.api_response.ApiResponse;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.repositorys.auctions.AuctionRepository;
import org.jio.orchidbe.container.AuctionContainer;
import org.jio.orchidbe.responses.AuctionResponse;
import org.jio.orchidbe.responses.BiddingResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.net.InetAddress;
import java.util.logging.Logger;

@Component
@Aspect
public class UserActivityLogger {
    private Logger logger = Logger.getLogger(getClass().getName());
    @Autowired
    private AuctionRepository auctionRepository;
    @Autowired
    private AuctionContainer auctionContainer;


    //named pointcut
    @Pointcut("within(@org.springframework.web.bind.annotation.RestController *)")
    public void controllerMethods() {}

    @Around("controllerMethods() && execution(* org.jio.orchidbe.controller.users.AuthController.*(..))")
    public Object logUserActivity(ProceedingJoinPoint joinPoint) throws Throwable {
        // Ghi log trước khi thực hiện method
        String methodName = joinPoint.getSignature().getName();
        String remoteAddress = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest().getRemoteAddr();
        String computerName = InetAddress.getLocalHost().getHostName();
        logger.info("User activity started: " + methodName + ", IP address: " + remoteAddress);
        // Thực hiện method gốc
        Object result = joinPoint.proceed();
        // Ghi log sau khi thực hiện method
        logger.info("User activity finished: " + methodName);
        return result;
    }

    @Around("controllerMethods() && execution(* org.jio.orchidbe.controller.auctions.AuctionController.*(..))")
    public Object logAuctionActivity(ProceedingJoinPoint joinPoint) throws Throwable {
        // Ghi log trước khi thực hiện method
        String methodName = joinPoint.getSignature().getName();
        String remoteAddress = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes(

        ))
                .getRequest().getRemoteAddr();
        String computerName = InetAddress.getLocalHost().getHostName();
        logger.info("User activity started: " + methodName + ", IP address: " + remoteAddress);
        // Thực hiện method gốc
        Object result = joinPoint.proceed();
        // Ghi log sau khi thực hiện method
        if (methodName.equals("updateAuction")){
            if (result instanceof ResponseEntity){
                ResponseEntity<?> responseEntity = (ResponseEntity<?>) result;
                if (responseEntity.getStatusCodeValue() == 200) {
                    ApiResponse<AuctionResponse> body = (ApiResponse<AuctionResponse>) responseEntity.getBody();
                    Long id = body.getPayload().getId();
                    Auction auction = auctionRepository.findById(id).get();
                    auctionContainer.addAuction(auction);
                    // Bây giờ bạn có thể làm cái gì đó với body ở đây
                }
            }
        }
        logger.info("User activity finished: " + methodName);
        return result;
    }

    @Around("controllerMethods() && execution(* org.jio.orchidbe.controller.auctions.BiddingController.*(..))")
    public Object logBiddingActivity(ProceedingJoinPoint joinPoint) throws Throwable {
        // Ghi log trước khi thực hiện method
        String methodName = joinPoint.getSignature().getName();
        String remoteAddress = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest().getRemoteAddr();
        String computerName = InetAddress.getLocalHost().getHostName();
        logger.info("User activity started: " + methodName + ", IP address: " + remoteAddress);
        // Thực hiện method gốc
        Object result = joinPoint.proceed();
        // Ghi log sau khi thực hiện method
        if (methodName.equals("bidding")){
            if (result instanceof ResponseEntity){
                ResponseEntity<?> responseEntity = (ResponseEntity<?>) result;
                if (responseEntity.getStatusCodeValue() == 200) {
                    ApiResponse<BiddingResponse> body = (ApiResponse<BiddingResponse>) responseEntity.getBody();
                    Long id = body.getPayload().getAuctionID();
                    Auction auction = auctionRepository.findById(id).get();
                    auctionContainer.addAuction(auction);


                    // Bây giờ bạn có thể làm cái gì đó với body ở đây
                }
            }
        }
        logger.info("User activity finished: " + methodName);
        return result;
    }

    @Around("controllerMethods() && execution(* org.jio.orchidbe.controller.testController.*(..))")
    public Object logUserhacker(ProceedingJoinPoint joinPoint) throws Throwable {
        // Ghi log trước khi thực hiện method
        String methodName = joinPoint.getSignature().getName();
        String remoteAddress = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes())
                .getRequest().getRemoteAddr();
        String computerName = InetAddress.getLocalHost().getHostName();
        logger.info("User activity started: " + methodName + ", IP address: " + remoteAddress +
                ", computerName: " + computerName);
        // Thực hiện method gốc
        Object result = joinPoint.proceed();
        // Ghi log sau khi thực hiện method
        logger.info("User activity finished: " + methodName);
        return result;
    }

}
