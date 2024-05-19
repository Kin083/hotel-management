package com.example.HotelManager.Entity;

import java.util.Date;

public class RequestForBooking {
    private Date cusDoB;
    private String cusEmail;
    private String cusGender;
    private String cusID;
    private String cusImg;
    private String cusName;
    private String cusNotes;
    private String cusPhone;
    private String name;
    private String startTime;

    public Date getCusDoB() {
        return cusDoB;
    }

    public void setCusDoB(Date cusDoB) {
        this.cusDoB = cusDoB;
    }

    public String getCusEmail() {
        return cusEmail;
    }

    public void setCusEmail(String cusEmail) {
        this.cusEmail = cusEmail;
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

    public String getCusImg() {
        return cusImg;
    }

    public void setCusImg(String cusImg) {
        this.cusImg = cusImg;
    }

    public String getCusName() {
        return cusName;
    }

    public void setCusName(String cusName) {
        this.cusName = cusName;
    }

    public String getCusNotes() {
        return cusNotes;
    }

    public void setCusNotes(String cusNotes) {
        this.cusNotes = cusNotes;
    }

    public String getCusPhone() {
        return cusPhone;
    }

    public void setCusPhone(String cusPhone) {
        this.cusPhone = cusPhone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getTypeOfRate() {
        return typeOfRate;
    }

    public void setTypeOfRate(String typeOfRate) {
        this.typeOfRate = typeOfRate;
    }

    public int getMoney() {
        return money;
    }

    public void setMoney(int money) {
        this.money = money;
    }

    private String endTime;
    private String typeOfRate;
    private int money;
}
