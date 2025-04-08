package com.example.api.mappers;

import com.example.api.dtos.FileResponseDto;
import com.example.api.entities.File;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface FileMapper {
    @Mapping(source = "user.id", target = "userId")
    FileResponseDto toDto(File file);
}