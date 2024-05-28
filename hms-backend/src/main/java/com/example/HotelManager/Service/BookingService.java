package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.BookingEntity;
import com.example.HotelManager.Entity.RoomEntity;
import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public BookingEntity addBooking(BookingEntity booking) {
        bookingRepository.save(booking);
        return booking;
    }
    public BookingEntity getBookingByID(int id) {
        return bookingRepository.findById(id).get();
    }
    public BookingEntity updateBooking(int id, BookingEntity bookingEntity) {
        BookingEntity booking = bookingRepository.findById(id).orElse(null);
        if (booking == null) return null;
        
        Integer guestId = bookingEntity.getGuestId();
        Integer roomNumber = bookingEntity.getRoomNumber();
        Date checkinDate = bookingEntity.getCheckinDate();
        Date checkoutDate  = bookingEntity.getCheckoutDate();
        Double totalPrice = bookingEntity.getTotalPrice();
        if (guestId != null) {
            booking.setGuestId(guestId);
        }
        if (roomNumber != null) {
            booking.setRoomNumber(roomNumber);
        }
        if (checkinDate != null) {
            booking.setCheckinDate(checkinDate);
        }
        if (checkoutDate != null) {
            booking.setCheckoutDate(checkoutDate);
        }
        if(totalPrice != null) {
            booking.setTotalPrice(totalPrice);
        }
        bookingRepository.save(booking);
        return booking;
    }

    public Long addBookingInforCaculate(BookingEntity booking, RoomEntity room, RoomTypeEntity roomType, int amount) {
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
        Integer roomTypeID = room.getTypeId();
        Double price = roomType.getNightRate();

        Double total = (Double) (price*daysDifference);
        booking.setTotalPrice(total);
//        bookingRepository.save(booking);
        return (long) (price*daysDifference*amount);
    }
}
