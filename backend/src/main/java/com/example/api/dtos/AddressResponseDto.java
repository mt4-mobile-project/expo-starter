package com.example.api.dtos;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class AddressResponseDto {
    private Integer id;
    private String street;
    private String city;
    private Double latitude;
    private Double longitude;
}