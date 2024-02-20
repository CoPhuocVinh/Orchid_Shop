package org.jio.orchidbe.services.products;

import lombok.RequiredArgsConstructor;
import org.jio.orchidbe.configs.AuctionConfig;
import org.jio.orchidbe.mappers.auctions.AuctionMapper;
import org.jio.orchidbe.mappers.products.ProductMapper;
import org.jio.orchidbe.models.auctions.Auction;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.repositorys.products.AuctionRepository;
import org.jio.orchidbe.repositorys.products.ProductRepository;
import org.jio.orchidbe.requests.CreateAuctionResquest;
import org.jio.orchidbe.responses.AuctionResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class AuctionService implements IAuctionService {
    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private Properties properties;


    public static LocalDateTime convertToLocalDateTime(Date dateToConvert) {
        return Instant.ofEpochMilli(dateToConvert.getTime())
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }
    @Override
    public void createAuction(CreateAuctionResquest createAuctionResquest) throws ParseException {
        //map
        SimpleDateFormat sdf = new SimpleDateFormat(properties.getProperty("date"));
        Date startDate = sdf.parse(createAuctionResquest.getStartDate());
        Date endDate = sdf.parse(createAuctionResquest.getEndDate());
        Date remindAt = sdf.parse(createAuctionResquest.getRemindAt());

        LocalDateTime localRemindAt = convertToLocalDateTime(remindAt);
        LocalDateTime localStartDateTime = convertToLocalDateTime(startDate);
        LocalDateTime localEndDateTime = convertToLocalDateTime(endDate);
        var auction = Auction.builder()
                .endDate(localEndDateTime)
                .startDate(localStartDateTime)
                .depositPrice(createAuctionResquest.getDepositPrice())
                .quantity(createAuctionResquest.getQuantity())
                .productName(createAuctionResquest.getProductName())
                .productCode(createAuctionResquest.getProductCode())
                .createdBy(createAuctionResquest.getCreatedBy())
                .modifiedBy(createAuctionResquest.getModifiedBy())
                .startPrice(createAuctionResquest.getStartPrice())
                .remindAt(localRemindAt)
                .build();

        Auction saveAuction = auctionRepository.save(auction);

    }
}
