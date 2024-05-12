package com.example.HotelManager.Entity;

public class ResponseForListRoom {
    private String RoomName;
    private String Type;
    private float DailyRate;

    public String getRoomName() {
        return RoomName;
    }

    public void setRoomName(String roomName) {
        RoomName = roomName;
    }

    public String getType() {
        return Type;
    }

    public void setType(String type) {
        Type = type;
    }

    public float getDailyRate() {
        return DailyRate;
    }

    public void setDailyRate(float dailyRate) {
        DailyRate = dailyRate;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getMaxiumCapacity() {
        return MaxiumCapacity;
    }

    public void setMaxiumCapacity(String maxiumCapacity) {
        MaxiumCapacity = maxiumCapacity;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        Notes = notes;
    }

    private String Status;
    private String MaxiumCapacity;
    private String Notes;

}
