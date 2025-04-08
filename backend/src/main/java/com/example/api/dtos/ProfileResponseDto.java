package com.example.api.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileResponseDto {
    private Integer id;
    private String description;
    private String instrumentPlayed;
    private String musicalInfluence;
    private Integer userId;
}