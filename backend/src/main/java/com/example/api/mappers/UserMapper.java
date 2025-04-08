package com.example.api.mappers;

import com.example.api.dtos.UserDto;
import com.example.api.dtos.UserResponseDto;
import com.example.api.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(source = "online", target = "isOnline")
    UserResponseDto toResponseDto(User user);
    
    List<UserResponseDto> toDtoList(List<User> users);
    
    UserDto toDto(User user);
    
    User toEntity(UserDto userDto);
}