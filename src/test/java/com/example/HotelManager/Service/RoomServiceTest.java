package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.RoomEntity;
import com.example.HotelManager.Repository.RoomRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class RoomServiceTest {
    @MockBean
    private RoomRepository repository;
    @Autowired
    private RoomService roomService;

    @Test
    public void testaddRoom() {
        RoomEntity room = new RoomEntity();
        room.setStatus("Using");
        room.setRoomName("102");
        room.setHotelID(1);
        room.setRoomnumber(12);
        room.setTypeID(1);

        Mockito.when(repository.save(room)).thenReturn(room);
        Assertions.assertEquals(roomService.savedetails(room),room);
    }
}
