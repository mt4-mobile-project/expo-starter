package com.example.api.controllers;

import com.example.api.dtos.RoomDto;
import com.example.api.dtos.RoomUpdateDto;
import com.example.api.entities.User;
import com.example.api.services.RoomService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public ResponseEntity<List<RoomDto>> getMyRooms(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(roomService.getRoomsByUserId(currentUser.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Integer id) {
        return ResponseEntity.ok(roomService.getRoomById(id));
    }

    @PostMapping
    public ResponseEntity<RoomDto> createRoom(
            Authentication authentication,
            @Valid @RequestBody RoomDto roomDto
    ) {
        return ResponseEntity.ok(roomService.createRoom(roomDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(
            @PathVariable Integer id
            // Authentication authentication
    ) {
        // User currentUser = (User) authentication.getPrincipal();
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}