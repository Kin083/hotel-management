package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.BookingEntity;
import com.example.HotelManager.Entity.PaymentEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MainService {
    public List<BookingEntity> getAllBookingPendings(List<PaymentEntity> listPay ,List<BookingEntity> lisBooking) {
        List<BookingEntity> lisPendBooking = new ArrayList<>();
        for (BookingEntity book : lisBooking) {
            Integer bookingID = book.getBookingID();
            boolean needAdded = true;
            for (PaymentEntity pay : listPay) {
                Integer bookingId_pay = pay.getBookingid();
                if (bookingID == bookingId_pay) {
                    needAdded = false;
                    break;
                }
            }
            if (needAdded == true){
                lisPendBooking.add(book);
            }
        }
        return lisPendBooking;
    }
}
