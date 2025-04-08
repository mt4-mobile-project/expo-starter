package com.example.api.repositories;

import com.example.api.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<File, Integer> {

    @Query("SELECT f FROM File f WHERE f.filableType = :filableType AND f.filableId = :filableId")
    Optional<File> findByFilableTypeAndFilableId(
        @Param("filableType") String filableType, 
        @Param("filableId") Integer filableId
    );
}