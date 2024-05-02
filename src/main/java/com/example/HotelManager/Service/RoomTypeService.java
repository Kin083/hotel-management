package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomTypeService {
    @Autowired
    private RoomTypeRepository roomTypeRepository;
    public RoomTypeEntity getRoomTypeByID(int RoomTypeID) {
        return roomTypeRepository.findById(RoomTypeID).get();
    }
    public RoomTypeEntity saveDetails(RoomTypeEntity roomType) {
        roomTypeRepository.save(roomType);
        return roomType;
    }
}
