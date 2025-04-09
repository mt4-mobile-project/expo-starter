package com.example.api.controllers;

import com.example.api.dtos.FileResponseDto;
import com.example.api.entities.User;
import com.example.api.services.FileService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/files")
@RequiredArgsConstructor
@Tag(name = "Files", description = "API pour la gestion des fichiers")
public class FileController {
    private final FileService fileService;
    
    @Value("${app.base-url}")
    private String baseUrl;

    @PostMapping("/upload")
    public ResponseEntity<FileResponseDto> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam("filable_type") String filableType,
            @RequestParam("filable_id") Integer filableId,
            Authentication authentication
    ) {
        User currentUser = (User) authentication.getPrincipal();
        FileResponseDto response = fileService.uploadFile(file, filableType, filableId, currentUser);
        response.setFilePath(baseUrl + "/files/images/" + response.getFileName());
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Récupérer un fichier par type et ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Fichier trouvé"),
        @ApiResponse(responseCode = "404", description = "Fichier non trouvé")
    })
    @GetMapping("/{filableType}/{filableId}")
    public ResponseEntity<Resource> getFile(
            @Parameter(description = "Type du fichier (profile ou event)") 
            @PathVariable("filableType") String filableType,
            @Parameter(description = "ID de l'entité associée") 
            @PathVariable("filableId") Integer filableId
    ) throws MalformedURLException {
        FileResponseDto file = fileService.getFileByFilableTypeAndId(filableType, filableId);

        Path filePath = Paths.get("uploads").resolve(file.getFileName()).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM))
                .body(resource);
    }

    @DeleteMapping("/{filableType}/{filableId}")
    @Operation(summary = "Supprimer un fichier par type et ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Fichier supprimé avec succès"),
        @ApiResponse(responseCode = "404", description = "Fichier non trouvé"),
        @ApiResponse(responseCode = "403", description = "Non autorisé à supprimer ce fichier")
    })
    public ResponseEntity<Void> deleteFile(
            @Parameter(description = "Type du fichier (profile ou event)") 
            @PathVariable("filableType") String filableType,
            @Parameter(description = "ID de l'entité associée") 
            @PathVariable("filableId") Integer filableId,
            Authentication authentication
    ) {
        User currentUser = (User) authentication.getPrincipal();
        fileService.deleteFile(filableType, filableId, currentUser);
        return ResponseEntity.noContent().build();
    }
}