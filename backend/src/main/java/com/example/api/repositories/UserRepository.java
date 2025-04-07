package com.example.api.repositories;

import com.example.api.entities.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM User u WHERE u.id IN " +
           "(SELECT r.user1.id FROM Room r WHERE r.id = :roomId) OR " +
           "u.id IN (SELECT r.user2.id FROM Room r WHERE r.id = :roomId)")
    List<User> findAllByRoomId(@Param("roomId") Integer roomId);
}
