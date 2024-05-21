package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.BookingEntity;
import com.example.HotelManager.Entity.RoomEntity;
import com.example.HotelManager.Repository.BookingRepository;
import com.example.HotelManager.Repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class RoomService {
    @Autowired
    private RoomRepository roomRepository;

    public RoomEntity savedetails(RoomEntity room) {
        roomRepository.save(room);
        return room;
    }
    public RoomEntity getRoom(int roomnumber) {
        return roomRepository.findById(roomnumber).get();
    }


    public String updateStatusUsing2Active(int id) {
        RoomEntity room = roomRepository.findById(id).get();
        String ans = room.getStatus();

        if(ans.equals("Using")) {
            room.setStatus("Available");

            roomRepository.save(room);
            return "Done";
        }
        else {
            return "Fail!!!";
        }
    }

    public String updateStatusActive2Using(int id) {
        RoomEntity room = roomRepository.findById(id).get();
        String ans = room.getStatus();

        if(ans.equals("Available")) {
            room.setStatus("Using");

            roomRepository.save(room);
            return "Done";
        }
        else {
            return "Fail!!!";
        }
    }
    public List<RoomEntity> getAllByHotelID(String HotelID) {
        return roomRepository.findByhotelID(HotelID);
    }


    public List<RoomEntity> getRoomByRoomName(String name) {
        return roomRepository.findByRoomName(name);
    }

    public int countByRtype(int roomtype) {
        return roomRepository.countRoom(roomtype,"Available");
    }
}