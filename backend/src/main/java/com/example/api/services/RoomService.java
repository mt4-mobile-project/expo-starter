package com.example.api.services;

import com.example.api.dtos.RoomDto;
import com.example.api.entities.Room;
import com.example.api.entities.User;
import com.example.api.exceptions.ApiException;
import com.example.api.mappers.RoomMapper;
import com.example.api.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomMapper roomMapper;

    public RoomService(RoomRepository roomRepository, RoomMapper roomMapper) {
        this.roomRepository = roomRepository;
        this.roomMapper = roomMapper;
    }

    public List<RoomDto> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(roomMapper::toDto)
                .collect(Collectors.toList());
    }

    public RoomDto getRoomById(Integer id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ApiException("Room not found", HttpStatus.NOT_FOUND));
        return roomMapper.toDto(room);
    }

    public List<RoomDto> getRoomsByUserId(Integer userId) {
        return roomRepository.findByUser1IdOrUser2Id(userId, userId)
                .stream()
                .map(roomMapper::toDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public RoomDto createRoom(RoomDto roomDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        
        if (roomDto.getUser2Id().equals(currentUser.getId())) {
            throw new ApiException("Cannot create a room with yourself", HttpStatus.BAD_REQUEST);
        }
        
        List<Room> existingRooms = roomRepository.findByUser1IdOrUser2Id(currentUser.getId(), currentUser.getId());
        boolean roomExists = existingRooms.stream().anyMatch(room -> 
            (room.getUser1().getId().equals(currentUser.getId()) && room.getUser2().getId().equals(roomDto.getUser2Id())) ||
            (room.getUser1().getId().equals(roomDto.getUser2Id()) && room.getUser2().getId().equals(currentUser.getId()))
        );
        
        if (roomExists) {
            throw new ApiException("A room already exists between these users", HttpStatus.CONFLICT);
        }

        roomDto.setUser1Id(currentUser.getId());
        Room room = roomMapper.toEntity(roomDto);
        Room savedRoom = roomRepository.save(room);
        
        return roomMapper.toDto(savedRoom);
    }

    public void deleteRoom(Integer id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ApiException("Room not found", HttpStatus.NOT_FOUND));
        roomRepository.deleteById(id);
    }
}