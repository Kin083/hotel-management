package com.example.HotelManager.API;

import com.example.HotelManager.Entity.GuestEntity;
import com.example.HotelManager.Service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class GuestController {
    @Autowired
    private GuestService guestService;
    @GetMapping(path= "/getallGuest")
    public @ResponseBody Iterable<GuestEntity> getAllGuests() {
        return guestService.getAllGuest();
    }


    @PostMapping(path = "/Guest/add")
    public GuestEntity addRoom(@RequestBody GuestEntity guest) {
        return guestService.saveDetails(guest);
    }
}
