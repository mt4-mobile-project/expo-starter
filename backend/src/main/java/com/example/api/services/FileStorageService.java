package com.example.api.services;

import com.example.api.config.FileStorageConfig;
import com.example.api.exceptions.ApiException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
    private final Path fileStorageLocation;

    public FileStorageService(FileStorageConfig fileStorageConfig) {
        this.fileStorageLocation = Paths.get(fileStorageConfig.getUploadDir())
                .toAbsolutePath().normalize();

        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new ApiException("Could not create the directory where the uploaded files will be stored.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String storeFile(MultipartFile file) {
        String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = getFileExtension(originalFileName);
        
        if (!isImageFile(fileExtension)) {
            throw new ApiException("Only image files are allowed!", HttpStatus.BAD_REQUEST);
        }

        try {
            String fileName = UUID.randomUUID().toString() + fileExtension;
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new ApiException("Could not store file " + originalFileName, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public String getUploadDir() {
        return this.fileStorageLocation.toString();
    }

    private String getFileExtension(String fileName) {
        int lastIndex = fileName.lastIndexOf('.');
        if (lastIndex == -1) {
            throw new ApiException("File has no extension", HttpStatus.BAD_REQUEST);
        }
        return fileName.substring(lastIndex).toLowerCase();
    }

    private boolean isImageFile(String fileExtension) {
        return fileExtension.equals(".jpg") || 
               fileExtension.equals(".jpeg") || 
               fileExtension.equals(".png") || 
               fileExtension.equals(".gif");
    }
}