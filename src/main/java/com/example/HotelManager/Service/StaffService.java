package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.StaffEntity;
import com.example.HotelManager.Repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;
    public StaffEntity addInforStaff(StaffEntity staff) {
        staffRepository.save(staff);
        return staff;
    }
}
