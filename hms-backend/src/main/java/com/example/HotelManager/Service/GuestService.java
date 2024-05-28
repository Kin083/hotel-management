package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.GuestEntity;
import com.example.HotelManager.Repository.GuestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GuestService {
    @Autowired
    private GuestRepository guestRepository;
    public Iterable<GuestEntity> getAllGuest() {
        return guestRepository.findAll();
    }
    public GuestEntity saveDetails(GuestEntity guest) {
        guestRepository.save(guest);
        return guest;
    }
}
