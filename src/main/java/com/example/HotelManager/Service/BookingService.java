package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.BookingEntity;
import com.example.HotelManager.Entity.RoomEntity;
import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.awt.print.Book;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;
    public Iterable<BookingEntity> getAllBooking() {
        return bookingRepository.findAll();
    }

    public List<BookingEntity> getAllBook() {
        return bookingRepository.findAll();
    }
    public BookingEntity addBookingInfor(BookingEntity booking) {
        bookingRepository.save(booking);
        return booking;
    }
    public BookingEntity getBookingByID(int id) {
        return bookingRepository.findById(id).get();
    }
    public BookingEntity updateBookingInfo(int id,BookingEntity bookEntity)
    {
        BookingEntity booking = bookingRepository.findById(id).get();
        Integer guetid = bookEntity.getGestID();
        Integer roomnumber = bookEntity.getRoomNumber();
        Date checkinDate = bookEntity.getCheckinDate();
        Date checkoutDate  = bookEntity.getCheckoutDate();
        Float totalP = bookEntity.getTotalPrice();
        if (guetid != null) {
            booking.setGestID(guetid);
        }
        if (roomnumber != null) {
            booking.setRoomNumber(roomnumber);
        }
        if (checkinDate != null) {
            booking.setCheckinDate(checkinDate);
        }
        if (checkoutDate != null) {
            booking.setCheckoutDate(checkoutDate);
        }
        if(totalP != null) {
            booking.setTotalPrice(totalP);
        }
        bookingRepository.save(booking);
        return booking;
    }

    public Long addBookingInforCaculate(BookingEntity booking,RoomEntity room,RoomTypeEntity roomType,int soluong) {
        Date checkinDate = booking.getCheckinDate();
        Date checkoutDate = booking.getCheckoutDate();
        long checkinTime = checkinDate.getTime();
        long checkoutTime = checkoutDate.getTime();

// Tính sự khác biệt giữa hai thời điểm tính bằng mili giây
        long timeDifference = checkoutTime - checkinTime;

// Chuyển đổi sự khác biệt thành số ngày (1 ngày = 24 * 60 * 60 * 1000 mili giây)
        long daysDifference = timeDifference / (24 * 60 * 60 * 1000);
        String statusRoom = room.getStatus();
        if (statusRoom.equals("Using")) {
            return (long) -1;
        }
        Integer roomTypeID = room.getTypeID();
        Float giatien = roomType.getPricepernight();

        Float thanhtien = (Float) (giatien*daysDifference);
        booking.setTotalPrice(thanhtien);
//        bookingRepository.save(booking);
        return (long) (giatien*daysDifference*soluong);
    }
}
