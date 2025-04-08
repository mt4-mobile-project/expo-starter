package com.example.api.repositories;

import com.example.api.entities.Event;
import com.example.api.entities.EventParticipant;
import com.example.api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

@Repository
public interface EventParticipantRepository extends JpaRepository<EventParticipant, Long> {
    Optional<EventParticipant> findByEventAndUser(Event event, User user);
    List<EventParticipant> findByEvent(Event event);
    boolean existsByEventAndUser(Event event, User user);
    List<EventParticipant> findByUser(User user);

    @Query("SELECT ep.event FROM EventParticipant ep WHERE ep.user.id = :userId")
    List<Event> findEventsByUserId(@Param("userId") Integer userId);
}