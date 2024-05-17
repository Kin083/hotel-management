package com.example.HotelManager.Entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table( name = "booking")
public class BookingEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingID")
    private int BookingID;

    public void setBookingID(int bookingID) {
        BookingID = bookingID;
    }

    public void setGestID(int guestID) {
        GuestID = guestID;
    }

    public void setRoomNumber(int roomNumber) {
        RoomName = roomNumber;
    }

    public void setCheckinDate(Date checkinDate) {
        CheckinDate = checkinDate;
    }

    public void setCheckoutDate(Date checkoutDate) {
        CheckoutDate = checkoutDate;
    }

    public void setTotalPrice(float totalPrice) {
        TotalPrice = totalPrice;
    }

    @Column(name = "GuestID")
    private int GuestID;
    @Column(name = "RoomNumber")
    private int RoomName;
    @Column(name = "CheckinDate")
    private Date CheckinDate;
    @Column(name = "CheckoutDate")
    private Date CheckoutDate;
    @Column(name = "TotalPrice")
    private float TotalPrice;

    public int getBookingID() {
        return BookingID;
    }

    public int getGestID() {
        return GuestID;
    }

    public int getRoomNumber() {
        return RoomName;
    }

    public Date getCheckinDate() {
        return CheckinDate;
    }

    public Date getCheckoutDate() {
        return CheckoutDate;
    }

    public float getTotalPrice() {
        return TotalPrice;
    }
}