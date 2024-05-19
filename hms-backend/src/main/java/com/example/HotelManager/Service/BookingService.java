package com.example.HotelManager.Service;


import com.example.HotelManager.Entity.*;

import com.example.HotelManager.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.awt.print.Book;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private GuestService guestService;
    @Autowired
    private RoomService roomService;

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

    public List<BookingEntity> getUniqueUsingRoom() {
        List<BookingEntity> listBookingUsing = bookingRepository.findTest();
        Map<Integer,BookingEntity> mapRoomIDToBooking = new HashMap<>();
        for(BookingEntity booking : listBookingUsing) {
            Integer roomumber = booking.getRoomNumber();
            Date checkinDate = booking.getCheckinDate();
            if (mapRoomIDToBooking.containsKey(roomumber)) {
                Date checkin = mapRoomIDToBooking.get(roomumber).getCheckinDate();
                if (checkinDate.after(checkin)) {
                    mapRoomIDToBooking.put(roomumber, booking);
                }
            }
            else {
                mapRoomIDToBooking.put(roomumber,booking);
            }
        }
        return bookingRepository.findTest();
    }
    public List<ResponseForUsingRoomInformation> getInforBookingAndGuest(GuestService guestService) {
        List<BookingEntity> lisUniqueBooing = getUniqueUsingRoom();
        List<ResponseForUsingRoomInformation> listans = new ArrayList<>();
        for (BookingEntity book : lisUniqueBooing) {
            ResponseForUsingRoomInformation res = new ResponseForUsingRoomInformation();
            Date starttime = book.getCheckinDate();
            Date endtime = book.getCheckoutDate();
            res.setStartTime(starttime);
            res.setEndTime(endtime);
            Float money = book.getTotalPrice();
            res.setMoney(money);
            Integer guestID = book.getGestID();
            List<GuestEntity> lisguestTMP = guestService.getByID(String.valueOf(guestID));
            GuestEntity guestTMP = lisguestTMP.get(0);
            String firstname = guestTMP.getFirstname();
            String cusID = guestTMP.getCusID();
            String gender = guestTMP.getCusGender();
            String Phone = guestTMP.getCusPhone();
            res.setFirstname(firstname);
            res.setCusID(cusID);
            res.setGender(gender);
            res.setPhone(Phone);

            listans.add(res);
        }
        return listans;
    }
    public List<GuestEntity> handleDataRecieve(RequestForBooking booking) {
        String cusID = booking.getCusID();

        List<GuestEntity> lisGuest = guestService.getByCusID(cusID);
        if(lisGuest.isEmpty()) {
            GuestEntity newGuest = new GuestEntity();
            newGuest.setCusDoB(booking.getCusDoB());
            newGuest.setCusEmail(booking.getCusEmail());
            newGuest.setCusGender(booking.getCusGender());
            newGuest.setFirstname(booking.getCusName());
            newGuest.setCusImg(booking.getCusImg());
            newGuest.setLastname("nothing");
            newGuest.setCusPhone(booking.getCusPhone());
            newGuest.setCusNotes(booking.getCusNotes());
            newGuest.setCusID(cusID);
            guestService.saveDetails(newGuest);

            List<GuestEntity> newListGuest = guestService.getByCusID(cusID);
            Integer guestID = newListGuest.get(0).getGuestID();
            List<RoomEntity> listRoom = roomService.getRoomByRoomName(booking.getName());
            Integer roomnumber = listRoom.get(0).getRoomnumber();
            roomService.updateStatusActive2Using(roomnumber);


            BookingEntity newBooking = new BookingEntity();
            newBooking.setTotalPrice(booking.getMoney());
            newBooking.setGestID(guestID);
            newBooking.setRoomNumber(roomnumber);


            String dateCheckinString = booking.getStartTime();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date checkinDate = new Date();
            try {
                checkinDate = formatter.parse(dateCheckinString);
                System.out.println(checkinDate);
            } catch (ParseException e) {
                e.printStackTrace();
            }

            String dateCheckoutString = booking.getEndTime();
            Date checkoutDate = new Date();
            try {
                 checkoutDate = formatter.parse(dateCheckoutString);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            newBooking.setCheckinDate(checkinDate);
            newBooking.setCheckoutDate(checkoutDate);
            bookingRepository.save(newBooking);
        } else {
            Integer guestID = lisGuest.get(0).getGuestID();
            List<RoomEntity> listRoom = roomService.getRoomByRoomName(booking.getName());
            Integer roomnumber = listRoom.get(0).getRoomnumber();
            roomService.updateStatusActive2Using(roomnumber);


            BookingEntity newBooking = new BookingEntity();
            newBooking.setTotalPrice(booking.getMoney());
            newBooking.setGestID(guestID);
            newBooking.setRoomNumber(roomnumber);


            String dateCheckinString = booking.getStartTime();
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            Date checkinDate = new Date();
            try {
                checkinDate = formatter.parse(dateCheckinString);
                System.out.println(checkinDate);
            } catch (ParseException e) {
                e.printStackTrace();
            }

            String dateCheckoutString = booking.getEndTime();
            Date checkoutDate = new Date();
            try {
                checkoutDate = formatter.parse(dateCheckoutString);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            newBooking.setCheckinDate(checkinDate);
            newBooking.setCheckoutDate(checkoutDate);
            bookingRepository.save(newBooking);
        }
        return lisGuest;
    }

}
