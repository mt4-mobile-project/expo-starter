package com.example.api.entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@Entity
@Table(name = "profiles")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String description;

    @Column(name = "instrument_played", nullable = false)
    private String instrumentPlayed;

    @Column(name = "musical_influence", nullable = false)
    private String musicalInfluence;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}