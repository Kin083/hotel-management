package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {
    @Query("SELECT p FROM BookingEntity p WHERE p.GuestID = :GuestID")
    List<BookingEntity> findByGestID(String GuestID);

    @Query(
            "(select p from BookingEntity p where p.RoomName in " +
            "(select roomnumber from RoomEntity where Status = 'Using')" +
            ")" )

    List<BookingEntity> findTest();

}