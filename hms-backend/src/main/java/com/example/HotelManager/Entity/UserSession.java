package com.example.HotelManager.Entity;


import org.springframework.stereotype.Component;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Entity
@Table(name="user_session")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class UserSession {
    @Id
    @Column(name="sessionId")
    private String sessionId;

    @Column(name="username")
    private String username;

    @Column(name="role")
    private String role;

    // Getters and setters
}
