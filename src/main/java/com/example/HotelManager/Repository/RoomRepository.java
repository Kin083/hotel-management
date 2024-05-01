package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<RoomEntity,Integer> {
}
