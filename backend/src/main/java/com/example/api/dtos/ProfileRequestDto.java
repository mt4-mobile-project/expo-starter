package com.example.api.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileRequestDto {
    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotBlank(message = "Instrument played cannot be empty")
    private String instrumentPlayed;

    @NotBlank(message = "Musical influence cannot be empty")
    private String musicalInfluence;
}