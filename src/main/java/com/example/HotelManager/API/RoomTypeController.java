package com.example.HotelManager.API;

import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoomTypeController {
    @Autowired
    private RoomTypeService roomTypeService;

    @PostMapping(path = "/update/roomTYpe")
    public RoomTypeEntity updateRoomtype(@RequestBody RoomTypeEntity roomType) {
        return roomTypeService.updateRoomType(roomType);
    }

    @PostMapping(path = "/Roomtype/add")
    public RoomTypeEntity addRoomType(@RequestBody RoomTypeEntity roomtype) {
        return roomTypeService.saveDetails(roomtype);
    }
}
