package com.example.api.services;

import com.example.api.dtos.MessageDto;
import com.example.api.dtos.MessageRequest;
import com.example.api.entities.Message;
import com.example.api.entities.Room;
import com.example.api.entities.User;
import com.example.api.exceptions.ResourceNotFoundException;
import com.example.api.repositories.MessageRepository;
import com.example.api.repositories.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final RoomRepository roomRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional(readOnly = true)
    public List<MessageDto> getAllMessages() {
        return messageRepository.findAll().stream()
                .map(MessageDto::fromEntity)
                .collect(Collectors.toList());
    }

    public MessageDto getMessageById(Integer id) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        
        return MessageDto.fromEntity(message);
    }

    @Transactional
    public List<MessageDto> getMessagesByRoomId(Integer roomId) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        messageRepository.markAllMessagesAsReadInRoom(roomId, currentUser.getId());

        List<Message> messages = messageRepository.findByRoom_Id(roomId);
        System.out.println("Found " + messages.size() + " messages for room ID: " + roomId);
        
        return messages.stream()
                .map(MessageDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional
    public MessageDto createMessage(MessageRequest messageRequest) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Room room = roomRepository.findById(messageRequest.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + messageRequest.getRoomId()));
        
        Message message = Message.builder()
                .content(messageRequest.getContent())
                .user(currentUser)
                .room(room)
                .isRead(false)
                .build();
        
        Message savedMessage = messageRepository.save(message);
        MessageDto messageDto = MessageDto.fromEntity(savedMessage);
        System.out.println("Done Message: " + savedMessage);

        messagingTemplate.convertAndSend(
            "/topic/room." + room.getId(),
            messageDto
        );
        
        // List<User> roomUsers = userRoomService.getUsersInRoom(room.getId());
        // for (User user : roomUsers) {
        //     if (!user.getId().equals(currentUser.getId())) {
        //         int unreadCount = messageRepository.countUnreadMessagesForUserAndRoom(user.getId(), room.getId());

        //         System.out.println("Done Message: " + savedMessage);
                
        //         messagingTemplate.convertAndSendToUser(
        //             user.getUsername(),
        //             "/queue/unreadCount",
        //             Map.of(
        //                 "roomId", room.getId(),
        //                 "count", unreadCount,
        //                 "timestamp", System.currentTimeMillis()
        //             )
        //         );
        //     }
        // }
        
        return messageDto;
    }
    
    public MessageDto updateMessage(Integer id, MessageRequest messageRequest) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        
        if (!message.getUser().getId().equals(currentUser.getId())) {
            throw new IllegalStateException("You can only update your own messages");
        }
        
        if (messageRequest.getRoomId() != null && !messageRequest.getRoomId().equals(message.getRoom().getId())) {
            
            Room room = roomRepository.findById(messageRequest.getRoomId())
                    .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + messageRequest.getRoomId()));
            message.setRoom(room);
        }
        
        message.setContent(messageRequest.getContent());
        
        Message updatedMessage = messageRepository.save(message);
        return MessageDto.fromEntity(updatedMessage);
    }

    public void deleteMessage(Integer id) {
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
        
        if (!message.getUser().getId().equals(currentUser.getId())) {
            throw new IllegalStateException("You can only delete your own messages");
        }
        
        messageRepository.delete(message);
    }
}