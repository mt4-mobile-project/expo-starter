package com.example.api.services;

import com.example.api.dtos.FileResponseDto;
import com.example.api.entities.File;
import com.example.api.entities.User;
import com.example.api.exceptions.ApiException;
import com.example.api.mappers.FileMapper;
import com.example.api.repositories.FileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class FileService {
    private final FileRepository fileRepository;
    private final FileStorageService fileStorageService;
    private final FileMapper fileMapper;

    @Transactional
    public FileResponseDto uploadFile(MultipartFile multipartFile, String filableType, Integer filableId, User currentUser) {
        if (!filableType.equals("profile") && !filableType.equals("event")) {
            throw new ApiException("Invalid filable type", HttpStatus.BAD_REQUEST);
        }

        fileRepository.findByFilableTypeAndFilableId(filableType, filableId)
            .ifPresent(fileRepository::delete);

        String fileName = fileStorageService.storeFile(multipartFile);
        
        File file = File.builder()
                .fileName(fileName)
                .filePath("/uploads/" + fileName)
                .fileType(multipartFile.getContentType())
                .fileSize((int) multipartFile.getSize())
                .filableType(filableType)
                .filableId(filableId)
                .user(currentUser)
                .build();

        File savedFile = fileRepository.save(file);
        return fileMapper.toDto(savedFile);
    }

    public FileResponseDto getFileByFilableTypeAndId(String filableType, Integer filableId) {
        return fileRepository.findByFilableTypeAndFilableId(filableType, filableId)
            .map(fileMapper::toDto)
            .orElseThrow(() -> new ApiException(
                String.format("No file found for %s with id %d", filableType, filableId),
                HttpStatus.NOT_FOUND
            ));
    }

    @Transactional
    public void deleteFile(String filableType, Integer filableId, User currentUser) {
        if (!filableType.equals("profile") && !filableType.equals("event")) {
            throw new ApiException("Invalid filable type", HttpStatus.BAD_REQUEST);
        }
        
        File file = fileRepository.findByFilableTypeAndFilableId(filableType, filableId)
            .orElseThrow(() -> new ApiException(
                String.format("No file found for %s with id %d", filableType, filableId),
                HttpStatus.NOT_FOUND
            ));
        
        if (!file.getUser().getId().equals(currentUser.getId())) {
            throw new ApiException("You are not authorized to delete this file", HttpStatus.FORBIDDEN);
        }
        
        try {
            Path filePath = Paths.get(fileStorageService.getUploadDir() + "/" + file.getFileName());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new ApiException("Failed to delete file: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        fileRepository.delete(file);
    }
}