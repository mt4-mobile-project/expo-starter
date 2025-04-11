package com.example.api.repositories;

import com.example.api.entities.User;
import com.example.api.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);

    // Custom query to find user by profile username
    @Query("SELECT u FROM User u JOIN u.profile p WHERE p.username = :username")
    Optional<User> findByProfileUsername(@Param("username") String username);

    @Query("SELECT u FROM User u WHERE u.id IN " +
           "(SELECT r.user1.id FROM Room r WHERE r.id = :roomId) OR " +
           "u.id IN (SELECT r.user2.id FROM Room r WHERE r.id = :roomId)")
    List<User> findAllByRoomId(@Param("roomId") Integer roomId);

    Optional<User> findByProfile(Profile profile);
}
