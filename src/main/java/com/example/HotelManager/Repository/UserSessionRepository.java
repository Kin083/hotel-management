package com.example.HotelManager.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.HotelManager.Entity.UserSession;

public interface UserSessionRepository extends JpaRepository<UserSession, String> {
  
}

