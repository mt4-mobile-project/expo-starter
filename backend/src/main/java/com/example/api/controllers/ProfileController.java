package com.example.api.controllers;

import com.example.api.dtos.ProfileRequestDto;
import com.example.api.dtos.ProfileResponseDto;
import com.example.api.entities.User;
import com.example.api.services.ProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/profiles")
@RequiredArgsConstructor
@Validated
public class ProfileController {
    private final ProfileService profileService;
    @GetMapping("/{id}")
    public ResponseEntity<ProfileResponseDto> getProfileById(@PathVariable Integer id) {
        return ResponseEntity.ok(profileService.getProfileById(id));
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileResponseDto> getMyProfile(Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(profileService.getProfileByUserId(currentUser.getId()));
    }

    @PostMapping
    public ResponseEntity<ProfileResponseDto> createProfile(
            Authentication authentication,
            @Valid @RequestBody ProfileRequestDto profileDto
    ) {
        User currentUser = (User) authentication.getPrincipal();
        ProfileResponseDto createdProfile = profileService.createProfile(currentUser.getId(), profileDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProfile);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProfileResponseDto> updateProfile(
            @PathVariable Integer id,
            @Valid @RequestBody ProfileRequestDto profileDto
    ) {
        return ResponseEntity.ok(profileService.updateProfile(id, profileDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Integer id) {
        profileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}