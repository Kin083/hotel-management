package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {
//    @Query("SELECT p FROM BookingEntity p WHERE p.guest_id = :guestId")
//    List<BookingEntity> findByGuestID(String guestId);
}