package org.jio.orchidbe.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jio.orchidbe.dtos.products.ProductDTOResponse;
import org.jio.orchidbe.dtos.users.UserDTOResponse;
import org.jio.orchidbe.models.products.Product;
import org.jio.orchidbe.models.users.User;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FeedbackResponse {
    private Long id;
    private String content;
    private Long auctionID;
    private String img;
    private String name;
    private Long userID;
}
