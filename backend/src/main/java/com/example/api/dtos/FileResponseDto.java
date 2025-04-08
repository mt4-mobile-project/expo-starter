package com.example.api.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FileResponseDto {
    private Integer id;
    private String fileName;
    private String fileType;
    private String filePath;
    private Long fileSize;
    private String filableType;
    private Integer filableId;
    private Integer userId;
}