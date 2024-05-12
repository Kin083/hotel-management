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
    @PostMapping(path = "/Room/add")
    public RoomEntity addRoom(@RequestBody RoomEntity roomen) {
        return  roomService.savedetails(roomen);
    }
    @GetMapping(path = "/getListRoom/{hotelid}")
    public List<ResponseForListRoom> getListRoom(@PathVariable String hotelid) {
        return lisResponse(hotelid,roomService,roomTypeService);
    }

    public List<ResponseForListRoom> lisResponse(String hotelid, RoomService roomService, RoomTypeService roomTypeService) {
        List<RoomEntity> listRoom =   roomService.getAllByHotelID(hotelid);
        List<ResponseForListRoom> listResponse = new ArrayList<>();
        for(RoomEntity room : listRoom) {
            String roomNum = room.getRoomName();
            int rtype = room.getTypeID();
            RoomTypeEntity roomtype = roomTypeService.getRoomTypeByID(rtype);
            ResponseForListRoom res = new ResponseForListRoom();
            res.setType(roomtype.getName());
            res.setRoomName(roomNum);
            res.setDailyRate(roomtype.getPricepernight());
            res.setStatus(room.getStatus());
            res.setMaxiumCapacity(roomtype.getCapacity());
            res.setNotes(roomtype.getDescription());
            res.setOvertimeRate(roomtype.getOvertimePay());
            res.setDayRate(roomtype.getDayRate());
            res.setNightRate(roomtype.getPricepernight());
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
            String capa = "";
            float dayrate = 0;
            float nightrate = 0;
            float dailyrate = 0;
            float overtimepay = 0;
            List<String> lisRoomNumber = new ArrayList<>();
            ResponseAvailRoom resAvail = new ResponseAvailRoom();
            int count = 0;
            for (ResponseForListRoom lis : lisResponseDetail) {
                String typeName = lis.getType();
                if (typeName.equals(type)) {
                    lisRoomNumber.add(lis.getRoomName());
                    capa = lis.getMaxiumCapacity();
                    dayrate = lis.getDailyRate();
                    nightrate = lis.getDailyRate();
                    dailyrate = lis.getDailyRate();
                    overtimepay = lis.getDailyRate();
                }

            }
            resAvail.setCapicity(capa);
            resAvail.setDailyRate(dailyrate);
            resAvail.setType(type);
            resAvail.setDayRate(dayrate);
            resAvail.setListRoomNumber(lisRoomNumber);
            ans.add(resAvail);
        }
        return ans;
    }
}
