package org.jio.orchidbe.dtos.api_response;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.jio.orchidbe.enums.StatusEnum;

import java.util.HashMap;
import java.util.Map;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private StatusEnum status;
    private T payload;
    private Map<String, String> error;
    private Map<String, Object> metadata;
    @JsonProperty("message")
    private String message;
    public void ok() {
        this.status = StatusEnum.SUCCESS;
    }

    public void ok(T data) {
        this.status = StatusEnum.SUCCESS;
        this.payload = data;
    }

    public void ok(T data, HashMap<String, Object> metadata) {
        this.status = StatusEnum.SUCCESS;
        this.payload = data;
        this.metadata = metadata;
    }

    public void error(Map<String, String> error) {
        this.status = StatusEnum.ERROR;
        this.error = error;
    }

    public void noContent(){
        this.status = StatusEnum.NO_CONTENT;
        this.payload = null;
    }
}
