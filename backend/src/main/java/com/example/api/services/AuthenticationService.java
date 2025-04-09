package com.example.api.services;

import com.example.api.dtos.LoginUserDto;
import com.example.api.dtos.RegisterUserDto;
import com.example.api.entities.User;
import com.example.api.exceptions.ApiException;
import com.example.api.repositories.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    
    private final PasswordEncoder passwordEncoder;
    
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        try {
            User user = new User()
                    .setEmail(input.getEmail())
                    .setFirstName(input.getFirstName())
                    .setLastName(input.getLastName())
                    .setPassword(passwordEncoder.encode(input.getPassword()));

            return userRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            System.out.println("erreur User = " + e.getMessage());
            throw new ApiException("Un utilisateur avec cet email existe déjà", HttpStatus.CONFLICT);
        } catch (Exception e) {
            System.out.println("erreur User = " + e.getMessage());
            throw new ApiException("Erreur lors de la création de l'utilisateur", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public User authenticate(LoginUserDto input) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );

            return userRepository.findByEmail(input.getEmail())
                    .orElseThrow(() -> new ApiException("Utilisateur non trouvé", HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            System.out.println("erreur User = " + e.getMessage());
            throw new ApiException("Authentification échouée", HttpStatus.UNAUTHORIZED);
        }
    }
}