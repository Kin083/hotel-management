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
    @Column(name = "PricePerNight")
    private Float pricepernight;
    @Column(name = "Capacity")
    private String capacity;
}
