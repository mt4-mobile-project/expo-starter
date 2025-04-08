package com.example.api.mappers;

import com.example.api.dtos.ProfileRequestDto;
import com.example.api.dtos.ProfileResponseDto;
import com.example.api.entities.Profile;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProfileMapper {
    @Mapping(source = "user.id", target = "userId")
    ProfileResponseDto toDto(Profile profile);
    
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "user", ignore = true)
    Profile toEntity(ProfileRequestDto dto);
    
    List<ProfileResponseDto> toDtoList(List<Profile> profiles);
}