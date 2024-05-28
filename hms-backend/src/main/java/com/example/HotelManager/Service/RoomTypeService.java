package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Repository.RoomTypeRepository;
import jakarta.persistence.Column;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomTypeService {
    @Autowired
    private RoomTypeRepository roomTypeRepository;
    public List<RoomTypeEntity> getAllRoomType() {
        return roomTypeRepository.findAll();
    }

    public RoomTypeEntity getRoomTypeById(int roomTypeId) {
        return roomTypeRepository.findById(roomTypeId).orElse(null);
    }

    public RoomTypeEntity saveRoomType(RoomTypeEntity roomType) {
        roomTypeRepository.save(roomType);
        return roomType;
    }

    public RoomTypeEntity updateRoomType(RoomTypeEntity roomType) {
        return roomTypeRepository.save(roomType);
    }

    public String deleteRoomType(Integer id) {
        roomTypeRepository.deleteById(id);
        return "Delete Success";
    }
}
