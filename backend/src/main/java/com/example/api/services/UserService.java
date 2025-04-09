package com.example.api.services;

import com.example.api.entities.Profile;
import com.example.api.entities.User;
import com.example.api.exceptions.ApiException;
import com.example.api.repositories.ProfileRepository;
import com.example.api.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository, 
            ProfileRepository profileRepository, 
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> allUsers() {
        return (List<User>) userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException("User not found", HttpStatus.NOT_FOUND));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Integer id, User updatedUser) {
        User user = getUserById(id);
        
        if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
            user.setEmail(updatedUser.getEmail());
        }

        if (updatedUser.getFirstName() != null && !updatedUser.getFirstName().isEmpty()) {
            user.setFirstName(updatedUser.getFirstName());
        }
        
        if (updatedUser.getLastName() != null && !updatedUser.getLastName().isEmpty()) {
            user.setLastName(updatedUser.getLastName());
        }
        
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        }
        
        return userRepository.save(user);
    }

    public void deleteUser(Integer id) {
        if (!userRepository.existsById(id)) {
            throw new ApiException("User not found", HttpStatus.NOT_FOUND);
        }
        userRepository.deleteById(id);
    }

    public User getUserByProfileUsername(String username) {
        // Use the custom repository method instead
        return userRepository.findByProfileUsername(username)
                .orElseThrow(() -> new ApiException("No user found with profile username: " + username, HttpStatus.NOT_FOUND));
    }
}