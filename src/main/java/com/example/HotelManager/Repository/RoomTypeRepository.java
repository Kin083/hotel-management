package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.RoomTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomTypeRepository extends JpaRepository<RoomTypeEntity,Integer> {
}
