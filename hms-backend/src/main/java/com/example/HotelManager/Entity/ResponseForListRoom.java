package com.example.HotelManager.Entity;

import lombok.Data;

@Data
public class ResponseForListRoom {
    private String roomNumber;
    private String type;
    private Double dailyRate;

    private Double dayRate;
    private Double nightRate;
    private Double overtimeRate;

    private String status;
    private int maximumCapacity;
    private String notes;

}
