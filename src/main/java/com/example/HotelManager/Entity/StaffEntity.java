package com.example.HotelManager.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "staff")
public class StaffEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "StaffID")
    private Integer StaffID;
    @Column(name = "HotelID")
    private Integer hotelID;
    @Column(name = "FirstName")
    private String firstName;
    @Column(name = "LastName")
    private String Lastname;
    @Column(name = "Position")
    private String pos;
    @Column(name = "Salary")
    private Float sala;
    @Column(name = "DateBirth")
    private String date;
    @Column(name = "Phone")
    private String phone;
    @Column(name = "Email")
    private String email;
    @Column(name = "HireDate")
    private String hiredate;

    public Integer getStaffID() {
        return StaffID;
    }

    public void setStaffID(Integer staffID) {
        StaffID = staffID;
    }

    public Integer getHotelID() {
        return hotelID;
    }

    public void setHotelID(Integer hotelID) {
        this.hotelID = hotelID;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastname() {
        return Lastname;
    }

    public void setLastname(String lastname) {
        Lastname = lastname;
    }

    public String getPos() {
        return pos;
    }

    public void setPos(String pos) {
        this.pos = pos;
    }

    public Float getSala() {
        return sala;
    }

    public void setSala(Float sala) {
        this.sala = sala;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHiredate() {
        return hiredate;
    }

    public void setHiredate(String hiredate) {
        this.hiredate = hiredate;
    }
}