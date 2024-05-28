<<<<<<< HEAD
package com.example.HotelManager.Controller;

import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roomType")
public class RoomTypeController {
    @Autowired
    private RoomTypeService roomTypeService;

    @GetMapping(path = "/getAll")
    public List<RoomTypeEntity> getAllRoomType() {
        return roomTypeService.getAllRoomType();
    }

    @PostMapping(path = "/add")
    public RoomTypeEntity addRoomType(@RequestBody RoomTypeEntity roomType) {
        return roomTypeService.saveRoomType(roomType);
    }

    @PutMapping(path = "/update/{id}")
    public RoomTypeEntity updateRoomType(@PathVariable Integer id, @RequestBody RoomTypeEntity roomType) {
        roomType.setTypeId(id);
        return roomTypeService.updateRoomType(roomType);
    }

    @DeleteMapping(path = "/delete/{id}")
    public String deleteRoomType(@PathVariable Integer id) {
        return roomTypeService.deleteRoomType(id);
    }
}
=======
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
>>>>>>> tuananh
