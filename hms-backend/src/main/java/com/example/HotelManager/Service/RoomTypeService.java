package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Repository.RoomTypeRepository;
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
    public RoomTypeEntity getRoomTypeByID(int RoomTypeID) {
        return roomTypeRepository.findById(RoomTypeID).orElse(null);
    }
    public RoomTypeEntity saveDetails(RoomTypeEntity roomType) {
        roomTypeRepository.save(roomType);
        return roomType;
    }

    public RoomTypeEntity updateRoomType(RoomTypeEntity roomType) {
        Integer typeId = roomType.getTypeId();
        RoomTypeEntity room  = roomTypeRepository.findById(typeId).orElse(null);
        if (room == null) return null;
        Integer capacity = Integer.valueOf(roomType.getCapacity());
        String Description = roomType.getDescription();
        String name = roomType.getName();
        Double price = roomType.getNightRate();

        room.setCapacity(capacity.toString());
        room.setName(name);
        room.setDescription(Description);
        room.setNightRate(price);
        roomTypeRepository.save(room);
        return room;
    }

}
