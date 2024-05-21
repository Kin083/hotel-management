package com.example.HotelManager.Entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "guest")
public class GuestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "GuestID")
    private Integer GuestID;
    @Column(name = "FirstName")
    private String Firstname;
    @Column(name = "LastName")
    private String Lastname;
    @Column(name = "DateOfBirth")
    private Date cusDoB;
    @Column(name = "Gender")
    private String cusGender;
    @Column(name = "CCCD")
    private String cusID;
    @Column(name = "Phone")
    private String cusPhone;
    @Column(name = "Email")
    private String cusEmail;

    public Integer getGuestID() {
        return GuestID;
    }

    public void setGuestID(Integer guestID) {
        GuestID = guestID;
    }

    public String getFirstname() {
        return Firstname;
    }

    public void setFirstname(String firstname) {
        Firstname = firstname;
    }

    public String getLastname() {
        return Lastname;
    }

    public void setLastname(String lastname) {
        Lastname = lastname;
    }

    public Date getCusDoB() {
        return cusDoB;
    }

    public void setCusDoB(Date cusDoB) {
        this.cusDoB = cusDoB;
    }

    public String getCusGender() {
        return cusGender;
    }

    public void setCusGender(String cusGender) {
        this.cusGender = cusGender;
    }

    public String getCusID() {
        return cusID;
    }

    public void setCusID(String cusID) {
        this.cusID = cusID;
    }

    public String getCusPhone() {
        return cusPhone;
    }

    public void setCusPhone(String cusPhone) {
        this.cusPhone = cusPhone;
    }

    public String getCusEmail() {
        return cusEmail;
    }

    public void setCusEmail(String cusEmail) {
        this.cusEmail = cusEmail;
    }

    public String getCusNotes() {
        return cusNotes;
    }

    public void setCusNotes(String cusNotes) {
        this.cusNotes = cusNotes;
    }

    public String getCusImg() {
        return cusImg;
    }

    public void setCusImg(String cusImg) {
        this.cusImg = cusImg;
    }

    @Column(name = "Notes")
    private String cusNotes;
    @Column(name = "Image")
    private String cusImg;


}