package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.HotelEntity;
import com.example.HotelManager.Repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {
    @Autowired
    private HotelRepository hotelRepository;
    public Iterable<HotelEntity> getAllHotel() {
        return hotelRepository.findAll();
    }
    public HotelEntity saveDetails(HotelEntity hotel) {
        hotelRepository.save(hotel);
        return hotel;
    }
}
