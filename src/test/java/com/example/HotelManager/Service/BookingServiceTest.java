package com.example.HotelManager.Service;
import com.example.HotelManager.Entity.BookingEntity;
import com.example.HotelManager.Repository.BookingRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import com.example.HotelManager.Entity.*;

import java.awt.print.Book;
import java.util.*;
//@WebMvcTest(BookingService.class)
@SpringBootTest
public class BookingServiceTest {
    @MockBean
    private BookingRepository repository;
    @Autowired
    private BookingService bookingService;
    @Test
    public void testBookingGetAllBooking() {
        List<BookingEntity> book = new ArrayList<>();
        Mockito.when(repository.findAll()).thenReturn(book);
        Assertions.assertEquals(bookingService.getAllBook(),book);
    }
    @Test
    public void testGetBookingByID() {

        BookingEntity test1 = new BookingEntity();
        test1.setBookingID(1);
        test1.setTotalPrice(20);
        Date t = new Date();
        test1.setCheckoutDate(t);
        test1.setCheckinDate(t);
        test1.setRoomNumber(2);
        test1.setGestID(214);
        Optional<BookingEntity> temp = Optional.of(test1);

        Mockito.when(repository.findById(1)).thenReturn(temp);
        Assertions.assertEquals(bookingService.getBookingByID(1),test1);
    }

    @Test
    public void testUpdateBookingInfo() {
        BookingEntity test1 = new BookingEntity();

        test1.setBookingID(1);
        test1.setTotalPrice(20);
        Date t = new Date();
        test1.setCheckoutDate(t);
        test1.setCheckinDate(t);
        test1.setRoomNumber(2);
        test1.setGestID(214);
        Optional<BookingEntity> temp = Optional.of(test1);

        Mockito.when(repository.findById(10)).thenReturn(temp);
        Assertions.assertEquals(bookingService.updateBookingInfo(10,test1),test1);
    }
}
