package com.example.HotelManager.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "roomtype")
public class RoomTypeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TypeID")
    private Integer typeID;
    @Column(name = "Name")
    private String name;

    public Integer getTypeID() {
        return typeID;
    }

    public void setTypeID(Integer typeID) {
        this.typeID = typeID;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Float getPricepernight() {
        return pricepernight;
    }

    public void setPricepernight(Float pricepernight) {
        this.pricepernight = pricepernight;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    @Column(name  = "Description")
    private String description;
    @Column(name = "NightRate")
    private Float pricepernight;
    @Column(name = "DayRate")
    private Float dayRate;

    public Float getDayRate() {
        return dayRate;
    }

    public void setDayRate(Float dayRate) {
        this.dayRate = dayRate;
    }

    public Float getDailyRate() {
        return dailyRate;
    }

    public void setDailyRate(Float dailyRate) {
        this.dailyRate = dailyRate;
    }

    public Float getOvertimePay() {
        return overtimePay;
    }

    public void setOvertimePay(Float overtimePay) {
        this.overtimePay = overtimePay;
    }

    @Column(name = "DailyRate")
    private Float dailyRate;
    @Column(name = "OvertimePay")
    private Float overtimePay;
    @Column(name = "Capacity")
    private String capacity;
}
