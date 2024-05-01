package com.example.HotelManager.Repository;

import com.example.HotelManager.Entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface PaymentRepository extends JpaRepository<PaymentEntity,Integer> {
}
