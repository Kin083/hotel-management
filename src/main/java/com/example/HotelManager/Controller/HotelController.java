package com.example.HotelManager.Controller;

import com.example.HotelManager.Entity.HotelEntity;
import com.example.HotelManager.Service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class HotelController {
    @Autowired
    private HotelService hotelService;

    @GetMapping(path = "/getallHotel")
    public @ResponseBody Iterable<HotelEntity> getAllHotel() {
        return hotelService.getAllHotel();
    }
//    This function will response all data about the payments which haved been payed


    //This function will set from using room to Active room

    @PostMapping(path="/HotelInformation/add")
    public HotelEntity addHotelInfor(@RequestBody HotelEntity hotel) {
        return hotelService.saveDetails(hotel);
    }

}
