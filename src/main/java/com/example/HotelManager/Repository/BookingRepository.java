package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {

}