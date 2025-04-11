package com.example.api.dtos;

import lombok.Data;
import lombok.experimental.Accessors;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class MessageSummaryDto {
    private String content;
    private LocalDateTime sentAt;
    private Integer senderId;
}


