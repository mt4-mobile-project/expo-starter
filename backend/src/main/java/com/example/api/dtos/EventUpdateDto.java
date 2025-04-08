package com.example.api.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class EventUpdateDto {
    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;
}