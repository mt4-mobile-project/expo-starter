package com.example.api.services;

import com.example.api.dtos.ProfileRequestDto;
import com.example.api.dtos.ProfileResponseDto;
import com.example.api.entities.Profile;
import com.example.api.entities.User;
import com.example.api.exceptions.ApiException;
import com.example.api.exceptions.ResourceNotFoundException;
import com.example.api.mappers.ProfileMapper;
import com.example.api.repositories.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final UserService userService;
    private final ProfileMapper profileMapper;

    public ProfileResponseDto getProfileById(Integer id) {
        return profileRepository.findById(id)
            .map(profileMapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("Profile not found with id: " + id));
    }

    public ProfileResponseDto getProfileByUserId(Integer userId) {
        return profileRepository.findByUserId(userId)
            .map(profileMapper::toDto)
            .orElseThrow(() -> new ResourceNotFoundException("Profile not found for user: " + userId));
    }

    @Transactional
    public ProfileResponseDto createProfile(Integer userId, ProfileRequestDto profileDto) {
        if (profileRepository.findByUserId(userId).isPresent()) {
            throw new ApiException("User already has a profile", HttpStatus.CONFLICT);
        }

        User user = userService.getUserById(userId);
        Profile profile = profileMapper.toEntity(profileDto);
        profile.setUser(user);
        
        Profile savedProfile = profileRepository.save(profile);
        return profileMapper.toDto(savedProfile);
    }

    @Transactional
    public ProfileResponseDto updateProfile(Integer id, ProfileRequestDto profileDto) {
        Profile profile = profileRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Profile not found with id: " + id));
            
        profile.setDescription(profileDto.getDescription());
        profile.setInstrumentPlayed(profileDto.getInstrumentPlayed());
        profile.setMusicalInfluence(profileDto.getMusicalInfluence());
        
        Profile updatedProfile = profileRepository.save(profile);
        return profileMapper.toDto(updatedProfile);
    }

    @Transactional
    public void deleteProfile(Integer id) {
        if (!profileRepository.existsById(id)) {
            throw new ResourceNotFoundException("Profile not found with id: " + id);
        }
        profileRepository.deleteById(id);
    }
}