package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.GuestEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface GuestRepository extends CrudRepository<GuestEntity,Integer> {
    @Query("SELECT p FROM GuestEntity p WHERE p.GuestID = :guestID")
    List<GuestEntity> findByGuestID(String guestID);
    @Query("SELECT p FROM GuestEntity p WHERE p.cusID = :CusID")
    List<GuestEntity> findByCusID(String CusID);
}
