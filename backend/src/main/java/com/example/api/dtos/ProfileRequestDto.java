package com.example.api.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileRequestDto {
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotBlank(message = "Instrument played cannot be empty")
    private String instrumentPlayed;

    @NotBlank(message = "Musical influence cannot be empty")
    private String musicalInfluence;
}