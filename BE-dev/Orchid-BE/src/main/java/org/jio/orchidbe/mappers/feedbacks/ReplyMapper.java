package org.jio.orchidbe.mappers.feedbacks;

import org.jio.orchidbe.models.feedbacks.Replys;
import org.jio.orchidbe.requests.replys.CreateReplyRequest;
import org.jio.orchidbe.responses.ReplyResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface ReplyMapper {
    ReplyResponse toResponse(Replys replys);

    @Mapping(target = "feedbacks", ignore = true)
    Replys toEntity(CreateReplyRequest createReplyRequest);
}
