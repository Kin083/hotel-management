package com.example.HotelManager.Entity;

import java.util.List;

public class ResponseAvailRoom {
    private String type;
    private String capicity;
    List<Integer> listRoomNumber;
    private Float dayRate;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCapicity() {
        return capicity;
    }

    public void setCapicity(String capicity) {
        this.capicity = capicity;
    }

    public List<Integer> getListRoomNumber() {
        return listRoomNumber;
    }

    public void setListRoomNumber(List<Integer> listRoomNumber) {
        this.listRoomNumber = listRoomNumber;
    }

    public Float getDayRate() {
        return dayRate;
    }

    public void setDayRate(Float dayRate) {
        this.dayRate = dayRate;
    }

    public Float getNightRate() {
        return nightRate;
    }

    public void setNightRate(Float nightRate) {
        this.nightRate = nightRate;
    }

    public Float getDailyRate() {
        return dailyRate;
    }

    public void setDailyRate(Float dailyRate) {
        this.dailyRate = dailyRate;
    }

    public Float getOvetimePay() {
        return ovetimePay;
    }

    public void setOvetimePay(Float ovetimePay) {
        this.ovetimePay = ovetimePay;
    }

    private Float nightRate;
    private Float dailyRate;
    private Float ovetimePay;
}
