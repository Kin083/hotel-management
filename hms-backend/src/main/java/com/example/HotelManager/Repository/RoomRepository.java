package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<RoomEntity, Integer> {
    @Query("SELECT p FROM RoomEntity p WHERE p.hotelId = :hotelId")
    List<RoomEntity> findByHotelId(String hotelId);
    @Query("SELECT count(p) FROM RoomEntity p where p.typeId = :roomTypeId and p.status = :status")
    int countRoom(int roomTypeId,String status);
}
