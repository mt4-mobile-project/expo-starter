package com.example.api.controllers;

import com.example.api.dtos.EventRequestDto;
import com.example.api.dtos.EventResponseDto;
import com.example.api.dtos.EventUpdateDto;
import com.example.api.dtos.UserResponseDto;
import com.example.api.entities.User;
import com.example.api.services.EventService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
@Tag(name = "Events", description = "API pour la gestion des événements")
public class EventController {
    private final EventService eventService;

    @GetMapping
    @Operation(summary = "Récupérer tous les événements")
    public ResponseEntity<List<EventResponseDto>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/me")
    @Operation(summary = "Récupérer mes événements")
    public ResponseEntity<List<EventResponseDto>> getMyEvents(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.getEventsByUserId(currentUser.getId()));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un événement par son ID")
    public ResponseEntity<EventResponseDto> getEventById(@PathVariable Integer id) {
        return ResponseEntity.ok(eventService.getEventById(id));
    }

    @PostMapping
    @Operation(summary = "Créer un nouvel événement")
    public ResponseEntity<EventResponseDto> createEvent(
            @Valid @RequestBody EventRequestDto eventDto,
            Authentication authentication
    ) {
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.createEvent(eventDto, currentUser));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour le nom et la description d'un événement")
    public ResponseEntity<EventResponseDto> updateEvent(
            @PathVariable Integer id,
            @Valid @RequestBody EventUpdateDto eventDto,
            Authentication authentication
    ) {
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.updateEvent(id, eventDto, currentUser));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un événement")
    public ResponseEntity<Void> deleteEvent(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        User currentUser = (User) authentication.getPrincipal();
        eventService.deleteEvent(id, currentUser);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/join")
    @Operation(summary = "Rejoindre un événement")
    public ResponseEntity<Void> joinEvent(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        User currentUser = (User) authentication.getPrincipal();

        System.out.println("Current User: " + currentUser.getId());
        eventService.joinEvent(id, currentUser);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/leave")
    @Operation(summary = "Quitter un événement")
    public ResponseEntity<Void> leaveEvent(
            @PathVariable Integer id,
            Authentication authentication
    ) {
        User currentUser = (User) authentication.getPrincipal();
        eventService.leaveEvent(id, currentUser);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/participants")
    @Operation(summary = "Récupérer les participants d'un événement")
    public ResponseEntity<List<UserResponseDto>> getEventParticipants(
            @PathVariable Integer id
    ) {
        return ResponseEntity.ok(eventService.getEventParticipants(id));
    }

    @GetMapping("/joined")
    @Operation(summary = "Récupérer tous les événements auxquels l'utilisateur a rejoint")
    public ResponseEntity<List<EventResponseDto>> getJoinedEvents(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(eventService.getJoinedEvents(currentUser.getId()));
    }
}