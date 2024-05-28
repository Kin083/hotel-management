package com.example.HotelManager.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "booking")
public class BookingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int bookingId;

    @Column(name = "guest_id")
    private int guestId;
    @Column(name = "room_number")
    private int roomNumber;
    @Column(name = "checkin_date")
    private Date checkinDate;
    @Column(name = "checkout_date")
    private Date checkoutDate;
    @Column(name = "money")
    private Double money;

    @Column(name = "guest_notes")
    private String guestNotes;
}