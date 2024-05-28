package com.example.HotelManager.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "room")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Integer roomId;

    @Column(name = "hotel_id")
    private Integer hotelId;
    @Column(name = "type_id")
    private Integer typeId;

    @Column(name = "room_number")
    private String roomNumber;

    private String status;
    private String notes;

}