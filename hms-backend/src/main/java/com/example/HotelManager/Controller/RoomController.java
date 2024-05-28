package com.example.HotelManager.Controller;

import com.example.HotelManager.Entity.ResponseAvailRoom;
import com.example.HotelManager.Entity.ResponseForListRoom;
import com.example.HotelManager.Entity.RoomEntity;
import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Service.RoomService;
import com.example.HotelManager.Service.RoomTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomTypeService roomTypeService;



    @GetMapping(path = "/updateStatusRoomUsing2Active/{id}")
    public String updateStatusUsing2Active(@PathVariable int id) {
        return roomService.updateStatusUsing2Active(id);
    }

    //This function will set from Active room to using room
    @GetMapping(path = "/updateStatusRoomActive2Using/{id}")
    public String updateStatusActive2Using(@PathVariable int id) {
        return roomService.updateStatusActive2Using(id);
    }
    @PostMapping(path = "/add")
    public RoomEntity addRoom(@RequestBody RoomEntity room) {
        return  roomService.saveDetails(room);
    }
    @GetMapping(path = "/getAll/{hotelId}")
    public List<ResponseForListRoom> getListRoom(@PathVariable String hotelId) {
        return lisResponse(hotelId, roomService, roomTypeService);
    }

    public List<ResponseForListRoom> lisResponse(String hotelId, RoomService roomService, RoomTypeService roomTypeService) {
        List<RoomEntity> listRoom =   roomService.getAllByHotelID(hotelId);
        List<ResponseForListRoom> listResponse = new ArrayList<>();
        for(RoomEntity room : listRoom) {
            String roomNum = room.getRoomNumber();
            int typeId = room.getTypeId();
            RoomTypeEntity roomType = roomTypeService.getRoomTypeById(typeId);
            ResponseForListRoom res = new ResponseForListRoom();
            res.setType(roomType.getName());
            res.setRoomNumber(roomNum);
            res.setDailyRate(roomType.getNightRate());
            res.setStatus(room.getStatus());
            res.setMaximumCapacity(roomType.getCapacity());
            res.setNotes(roomType.getDescription());
            res.setOvertimeRate(roomType.getOvertimePay());
            res.setDayRate(roomType.getDayRate());
            res.setNightRate(roomType.getNightRate());
            listResponse.add(res);
        }
        return listResponse;
    }

    @GetMapping(path = "/getAvailRoom/{id}")
    public List<ResponseAvailRoom> getAvailRoom(@PathVariable String id) {
        List<ResponseForListRoom> lisResponseDetail =lisResponse(id, roomService, roomTypeService);
        List<String> listType = new ArrayList<>();
        Set<String> set  = new HashSet<>();
        for (ResponseForListRoom lis : lisResponseDetail) {
            String status = lis.getStatus();
            if (status.equals("Available")) {
                set.add(lis.getType());
            }
        }
        for(String s : set) {
            listType.add(s);
        }

        List<ResponseAvailRoom> ans = new ArrayList<>();
        for (String type : listType) {
            int capa = 0;
            Double dayrate = (double) 0;
            Double nightrate = (double) 0;
            Double dailyrate = (double) 0;
            Double overtimepay = (double) 0;
            List<String> lisRoomNumber = new ArrayList<>();
            ResponseAvailRoom resAvail = new ResponseAvailRoom();
            int count = 0;
            for (ResponseForListRoom lis : lisResponseDetail) {
                String typeName = lis.getType();
                if (typeName.equals(type)) {
                    lisRoomNumber.add(lis.getRoomNumber());
                    capa = lis.getMaximumCapacity();
                    dayrate = lis.getDayRate();
                    nightrate = lis.getNightRate();
                    dailyrate = lis.getDailyRate();
                    overtimepay = lis.getOvertimeRate();
                }

            }
            resAvail.setCapacity(capa);
            resAvail.setDailyRate(dailyrate);
            resAvail.setType(type);
            resAvail.setDayRate(dayrate);
            resAvail.setListRoomNumber(lisRoomNumber);
            resAvail.setNightRate(nightrate);
            resAvail.setOvertimePay(overtimepay);
            ans.add(resAvail);
        }
        return ans;
    }
}
