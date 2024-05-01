package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.GuestEntity;
import org.springframework.data.repository.CrudRepository;

public interface GuestRepository extends CrudRepository<GuestEntity,Integer> {
}
