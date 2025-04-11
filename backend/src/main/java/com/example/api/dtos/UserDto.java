package com.example.api.dtos;

import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import lombok.Data;
import lombok.experimental.Accessors;
import com.fasterxml.jackson.annotation.JsonProperty;
import static com.fasterxml.jackson.annotation.JsonProperty.Access.READ_ONLY;

@Data
@Accessors(chain = true)
public class UserDto {
    @JsonProperty(access = READ_ONLY)
    private Integer id;

    @Email(message = "Email should be valid")
    private String email;

    @Size(min = 2, max = 50, message = "First name must be between 2 and 50 characters")
    private String firstName;

    @Size(min = 2, max = 50, message = "Last name must be between 2 and 50 characters")
    private String lastName;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
}