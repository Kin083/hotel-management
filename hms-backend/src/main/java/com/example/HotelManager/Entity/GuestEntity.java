package com.example.HotelManager.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "guest")
public class GuestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "guest_id")
    private Integer guestId;

    @Column(name = "id_number")
    private String idNumber;
    private String name;
    @Column(name = "dob")
    private Date dob;

    private String gender;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;
}