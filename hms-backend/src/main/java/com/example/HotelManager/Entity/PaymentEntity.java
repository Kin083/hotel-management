package com.example.HotelManager.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "payment")
public class PaymentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Integer paymentId;
    @Column(name = "booking_id")
    private Integer bookingId;

    private Double amount;
    
    @Column(name = "payment_date")
    private String paymentDate;
    @Column(name = "payment_method")
    private String paymentMethod;

}