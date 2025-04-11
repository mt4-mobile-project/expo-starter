CREATE DATABASE IF NOT EXISTS `event-db`;
USE `event-db`;

CREATE TABLE IF NOT EXISTS `users` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `email` VARCHAR(255) UNIQUE NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `is_online` BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS `rooms` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `user1_id` INT NOT NULL,
    `user2_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user1_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`user2_id`) REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `messages` (
    `id` BIGINT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `message` TEXT NOT NULL,
    `user_id` INT NOT NULL,
    `room_id` BIGINT NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT FALSE,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`room_id`) REFERENCES `rooms`(`id`)
);

CREATE TABLE IF NOT EXISTS `events` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `event_participants` (
    `id` BIGINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `event_id` INT NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY (`event_id`) REFERENCES `events`(`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `profiles` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `instrument_played` VARCHAR(255) NOT NULL,
    `musical_influence` TEXT NOT NULL,
    `user_id` INT NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `files` (
    `id` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `user_id` INT NOT NULL,
    `file_name` VARCHAR(255) NOT NULL,
    `file_path` VARCHAR(1024) NOT NULL,
    `file_type` VARCHAR(100) NOT NULL,
    `file_size` INT NOT NULL,
    `filable_type` VARCHAR(100) NOT NULL,
    `filable_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY `unique_filable` (`filable_type`, `filable_id`),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE IF NOT EXISTS `addresses` (
    `id` INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(500) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `coordinates` POINT NOT NULL,
    `event_id` INT NOT NULL,
    FOREIGN KEY (`event_id`) REFERENCES `events`(`id`)
);