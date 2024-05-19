package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.RoomEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<RoomEntity,Integer> {
    @Query("SELECT p FROM RoomEntity p WHERE p.hotelID = :HotelID")
    List<RoomEntity> findByhotelID(String HotelID);
    @Query("SELECT count(p) FROM RoomEntity p where p.typeID = :roomtypeid and p.Status = :status")
    int countRoom(int roomtypeid,String status);


    @Query("SELECT p FROM RoomEntity p where p.RoomName = :name")
    List<RoomEntity> findByRoomName(String name);

}
