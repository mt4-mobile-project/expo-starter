package com.example.api.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDto {
    private Integer id;
    private String firstName;
    private String lastName;
    private boolean isOnline;
}