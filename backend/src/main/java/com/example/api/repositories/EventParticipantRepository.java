package com.example.api.repositories;

import com.example.api.entities.Event;
import com.example.api.entities.EventParticipant;
import com.example.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventParticipantRepository extends JpaRepository<EventParticipant, Long> {
    Optional<EventParticipant> findByEventAndUser(Event event, User user);
    List<EventParticipant> findByEvent(Event event);
    boolean existsByEventAndUser(Event event, User user);
}