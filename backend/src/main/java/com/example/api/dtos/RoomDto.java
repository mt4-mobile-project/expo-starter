package com.example.api.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.experimental.Accessors;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import static com.fasterxml.jackson.annotation.JsonProperty.Access.READ_ONLY;
import java.time.LocalDateTime;

@Data
@Accessors(chain = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class RoomDto {
    @JsonProperty(access = READ_ONLY)
    private Integer id;

    @JsonProperty(value = "user1_id", access = READ_ONLY)
    private Integer user1Id;

    @NotNull(message = "user2_id is required")
    @JsonProperty("user2_id")
    private Integer user2Id;

    @JsonProperty(value = "created_at", access = READ_ONLY)
    private LocalDateTime createdAt;

    @JsonProperty(value = "updated_at", access = READ_ONLY)
    private LocalDateTime updatedAt;
}
