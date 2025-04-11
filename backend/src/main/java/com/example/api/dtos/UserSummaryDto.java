package com.example.api.dtos;

import lombok.Data;
import lombok.experimental.Accessors;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@Data
@Accessors(chain = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class UserSummaryDto {
    private Integer id;
    private String name;
    private String profile;
}

