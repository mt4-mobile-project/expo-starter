package com.example.api.repositories;

import com.example.api.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Integer> {
    Optional<Profile> findByUserId(Integer userId);
    
    // Add method to check if username exists
    boolean existsByUsername(String username);
    
    // Add method to find by username
    Optional<Profile> findByUsername(String username);
}