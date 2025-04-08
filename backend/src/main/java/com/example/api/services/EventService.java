package com.example.api.services;

import com.example.api.dtos.EventRequestDto;
import com.example.api.dtos.EventResponseDto;
import com.example.api.dtos.EventUpdateDto;
import com.example.api.dtos.UserResponseDto;
import com.example.api.entities.Address;
import com.example.api.entities.Event;
import com.example.api.entities.EventParticipant;
import com.example.api.entities.User;
import com.example.api.exceptions.ApiException;
import com.example.api.mappers.EventMapper;
import com.example.api.mappers.UserMapper;
import com.example.api.repositories.EventRepository;
import com.example.api.repositories.EventParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EventService {
    private final EventRepository eventRepository;
    private final EventMapper eventMapper;
    private final AddressService addressService;
    private final EventParticipantRepository eventParticipantRepository;
    private final UserMapper userMapper;

    public EventResponseDto getEventById(Integer id) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new ApiException("Event not found", HttpStatus.NOT_FOUND));
        return eventMapper.toDto(event);
    }

    public List<EventResponseDto> getEventsByUserId(Integer userId) {
        return eventMapper.toDtoList(eventRepository.findByUserId(userId));
    }

    public List<EventResponseDto> getAllEvents() {
        return eventMapper.toDtoList(eventRepository.findAll());
    }

    @Transactional
    public EventResponseDto createEvent(EventRequestDto eventDto, User currentUser) {
        Event event = eventMapper.toEntity(eventDto);
        event.setUser(currentUser);

        Address address = addressService.createAddress(eventDto.getAddress(), event);
        event.setAddress(address);

        Event savedEvent = eventRepository.save(event);
        return eventMapper.toDto(savedEvent);
    }

    @Transactional
    public EventResponseDto updateEvent(Integer id, EventUpdateDto eventDto, User currentUser) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new ApiException("Event not found", HttpStatus.NOT_FOUND));

        if (!event.getUser().getId().equals(currentUser.getId())) {
            throw new ApiException("Not authorized to update this event", HttpStatus.FORBIDDEN);
        }

        event.setName(eventDto.getName());
        event.setDescription(eventDto.getDescription());

        Event savedEvent = eventRepository.save(event);
        return eventMapper.toDto(savedEvent);
    }

    @Transactional
    public void deleteEvent(Integer id, User currentUser) {
        Event event = eventRepository.findById(id)
            .orElseThrow(() -> new ApiException("Event not found", HttpStatus.NOT_FOUND));

        if (!event.getUser().getId().equals(currentUser.getId())) {
            throw new ApiException("Not authorized to delete this event", HttpStatus.FORBIDDEN);
        }

        eventRepository.delete(event);
    }

    @Transactional
    public void joinEvent(Integer eventId, User currentUser) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ApiException("Event not found", HttpStatus.NOT_FOUND));
        
        if (eventParticipantRepository.existsByEventAndUser(event, currentUser)) {
            throw new ApiException("You are already registered for this event", HttpStatus.BAD_REQUEST);
        }
        
        EventParticipant participant = EventParticipant.builder()
            .event(event)
            .user(currentUser)
            .build();
        
        eventParticipantRepository.save(participant);
    }

    @Transactional
    public void leaveEvent(Integer eventId, User currentUser) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ApiException("Event not found", HttpStatus.NOT_FOUND));
        
        EventParticipant participant = eventParticipantRepository.findByEventAndUser(event, currentUser)
            .orElseThrow(() -> new ApiException("You are not registered for this event", HttpStatus.BAD_REQUEST));
        
        eventParticipantRepository.delete(participant);
    }

    public List<UserResponseDto> getEventParticipants(Integer eventId) {
        Event event = eventRepository.findById(eventId)
            .orElseThrow(() -> new ApiException("Event not found", HttpStatus.NOT_FOUND));
        
        List<User> participants = eventParticipantRepository.findByEvent(event).stream()
            .map(EventParticipant::getUser)
            .collect(Collectors.toList());
        
        return userMapper.toDtoList(participants);
    }
}