package com.example.HotelManager.Entity;

import lombok.Data;

import java.util.List;

@Data
public class ResponseAvailRoom {
    private String type;
    private int capacity;
    private List<String> listRoomNumber;
    private Double dayRate;

    private Double nightRate;
    private Double dailyRate;
    private Double overtimePay;
}
