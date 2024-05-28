package com.example.HotelManager.Controller;

import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RoomTypeController {
    @Autowired
    private RoomTypeService roomTypeService;

    @PostMapping(path = "/roomType/update")
    public RoomTypeEntity updateRoomType(@RequestBody RoomTypeEntity roomType) {
        return roomTypeService.updateRoomType(roomType);
    }

    @PostMapping(path = "/roomType/add")
    public RoomTypeEntity addRoomType(@RequestBody RoomTypeEntity roomType) {
        return roomTypeService.saveDetails(roomType);
    }
    @GetMapping(path = "/roomType/getAll")
    public List<RoomTypeEntity> getRoomType() {
        return roomTypeService.getAllRoomType();
    }
}
