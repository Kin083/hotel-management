package com.example.HotelManager.Entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "guest")
public class GuestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "GuestID")
    private Integer GuestID;
    @Column(name = "FirstName")
    private String Firstname;
    @Column(name = "LastName")
    private String Lastname;
    @Column(name = "DateOfBirth")
    private Date Dateofbirth;
    @Column(name = "Address")
    private String Address;
    @Column(name = "Phone")
    private String phone;
    @Column(name = "Email")
    private String Email;
    public Integer getGuestID() {
        return GuestID;
    }

    public String getFirstname() {
        return Firstname;
    }

    public String getLastname() {
        return Lastname;
    }

    public void setGuestID(Integer guestID) {
        GuestID = guestID;
    }

    public void setFirstname(String firstname) {
        Firstname = firstname;
    }

    public void setLastname(String lastname) {
        Lastname = lastname;
    }

    public void setDateofbirth(Date dateofbirth) {
        Dateofbirth = dateofbirth;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setEmail(String email) {
        Email = email;
    }

    public Date getDateofbirth() {
        return Dateofbirth;
    }

    public String getAddress() {
        return Address;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return Email;
    }
}
