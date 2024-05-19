package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.StaffEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<StaffEntity,Integer> {
}
