package com.example.api.mappers;

import com.example.api.dtos.RoomDto;
import com.example.api.dtos.RoomUpdateDto;
import com.example.api.entities.Room;
import com.example.api.entities.User;
import com.example.api.repositories.UserRepository;
import com.example.api.exceptions.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

@Component
public class RoomMapper {
    private final UserRepository userRepository;

    public RoomMapper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public RoomDto toDto(Room room) {
        return new RoomDto()
                .setId(room.getId())
                .setUser1Id(room.getUser1().getId())
                .setUser2Id(room.getUser2().getId())
                .setCreatedAt(room.getCreatedAt())
                .setUpdatedAt(room.getUpdatedAt());
    }

    public Room toEntity(RoomDto dto) {
        User user1 = userRepository.findById(dto.getUser1Id())
                .orElseThrow(() -> new ApiException("User1 not found", HttpStatus.NOT_FOUND));
        User user2 = userRepository.findById(dto.getUser2Id())
                .orElseThrow(() -> new ApiException("User2 not found", HttpStatus.NOT_FOUND));

        return new Room()
                .setUser1(user1)
                .setUser2(user2);
    }
}