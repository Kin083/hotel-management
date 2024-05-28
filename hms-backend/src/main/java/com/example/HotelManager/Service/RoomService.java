<<<<<<< HEAD
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

    public RoomEntity saveDetails(RoomEntity room) {
        roomRepository.save(room);
        return room;
    }
    public RoomEntity getRoom(int roomNumber) {
        return roomRepository.findById(roomNumber).orElse(null);
    }


    public String updateStatusUsing2Active(int id) {
        RoomEntity room = roomRepository.findById(id).orElse(null);
        if (room == null) return null;

        String ans = room.getStatus();
        if(ans.equals("using")) {
            room.setStatus("Active");
            roomRepository.save(room);
            return "Done";
        }
        else {
            return "Fail!!!";
        }
    }

    public String updateStatusActive2Using(int id) {
        RoomEntity room = roomRepository.findById(id).orElse(null);
        if (room == null) return null;
        String ans = room.getStatus();
        if(ans.equals("Active")) {
            room.setStatus("using");
            roomRepository.save(room);
            return "Done";
        }
        else {
            return "Fail!!!";
        }
    }
    public List<RoomEntity> getAllByHotelID(String hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    public int countByRoomType(int roomType) {
        return roomRepository.countRoom(roomType,"Available");
    }
}
=======
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

    public RoomEntity saveDetails(RoomEntity room) {
        roomRepository.save(room);
        return room;
    }
    public RoomEntity getRoom(int roomNumber) {
        return roomRepository.findById(roomNumber).orElse(null);
    }


    public String updateStatusUsing2Active(int id) {
        RoomEntity room = roomRepository.findById(id).orElse(null);
        if (room == null) return null;

        String ans = room.getStatus();
        if(ans.equals("using")) {
            room.setStatus("Active");
            roomRepository.save(room);
            return "Done";
        }
        else {
            return "Fail!!!";
        }
    }

    public String updateStatusActive2Using(int id) {
        RoomEntity room = roomRepository.findById(id).orElse(null);
        if (room == null) return null;
        String ans = room.getStatus();
        if(ans.equals("Active")) {
            room.setStatus("using");
            roomRepository.save(room);
            return "Done";
        }
        else {
            return "Fail!!!";
        }
    }
    public List<RoomEntity> getAllByHotelID(String hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }

    public int countByRoomType(int roomType) {
        return roomRepository.countRoom(roomType,"Available");
    }
}
>>>>>>> tuananh
