package com.example.HotelManager.API;

import com.example.HotelManager.Entity.*;
import com.example.HotelManager.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Book;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.Temporal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController // This means that this class is a Controller
//@RequestMapping(path="/demo") // This means URL's start with /demo (after Application path)
public class ControllerAPI {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private BookingRepository bookingRepository;
    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private RoomTypeRepository roomtypeRepository;
    @Autowired
    private StaffRepository staffRepository;


    @GetMapping(path="/getallBooking")
    public @ResponseBody Iterable<BookingEntity> getAllBooking() {
        // This returns a JSON or XML with the users
        return bookingRepository.findAll();
    }
    @GetMapping(path= "/getallGuest")
    public @ResponseBody Iterable<GuestEntity> getAllGuests() {
        return guestRepository.findAll();
    }
    @GetMapping(path = "/getallHotel")
    public @ResponseBody Iterable<HotelEntity> getAllHotel() {
        return hotelRepository.findAll();
    }
//    This function will response all data about the payments which haved been payed
    @GetMapping(path = "/getallPayments")
    public @ResponseBody Iterable<PaymentEntity> getAllPayments() {
        return paymentRepository.findAll();
    }

    @GetMapping(path = "/getTypeRoomByID/{id}")
    public Optional<PaymentEntity> getDataByID(@PathVariable int id) {
        return paymentRepository.findById(id);
    }
    //This function will set from using room to Active room
    @GetMapping(path = "/updateStatusRoomUsing2Active/{id}")
    public String updateStatusUsing2Active(@PathVariable int id) {
        RoomEntity room = roomRepository.findById(id).get();
        String ans = room.getStatus();
        if(ans.equals("using")) {
            room.setStatus("ACtive");
            roomRepository.save(room);
            return "Done";
        }
        else {
            return "Fail!!!";
        }
    }

    //This function will set from Active room to using room
    @GetMapping(path = "/updateStatusRoomActive2Using/{id}")
    public String updateStatusActive2Using(@PathVariable int id) {
        RoomEntity room = roomRepository.findById(id).get();
        String ans = room.getStatus();
        if(ans.equals("ACtive")) {
            room.setStatus("using");
            roomRepository.save(room);
            return "Done";
        }
        else {
            return "Fail!!!";
        }
    }
    @PostMapping(path = "/updateBooking/{id}")
    public BookingEntity updateBookingInfo(@PathVariable int id,@RequestBody BookingEntity bookEntity)
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
    @PostMapping(path="/HotelInformation/add")
    public HotelEntity addHotelInfor(@RequestBody HotelEntity hotel) {
        hotelRepository.save(hotel);
        return hotel;
    }
    @PostMapping(path = "/Roomtype/add")
    public RoomTypeEntity addRoomType(@RequestBody RoomTypeEntity roomtype) {
        roomtypeRepository.save(roomtype);
        return roomtype;
    }
    @PostMapping(path = "/Room/add")
    public RoomEntity addRoom(@RequestBody RoomEntity roomen) {
        roomRepository.save(roomen);
        return roomen;
    }
    @PostMapping(path = "/Guest/add")
    public GuestEntity addRoom(@RequestBody GuestEntity guest) {
        guestRepository.save(guest);
        return guest;
    }
    @PostMapping(path = "/payments/add")
    public PaymentEntity addpayment(@RequestBody PaymentEntity payment) {
        paymentRepository.save(payment);
        return  payment;
    }
    @PostMapping(path = "/BookingInfomation/add")
    public BookingEntity addBookingInfor(@RequestBody BookingEntity booking) {
        bookingRepository.save(booking);
        return booking;
    }
    @PostMapping(path = "/Staff/add")
    public StaffEntity addStaffInfor(@RequestBody StaffEntity staff) {
        staffRepository.save(staff);
        return staff;
    }

    @PostMapping(path = "/booking/addInforcaculate")
    public Long addBookingInforCaculate(@RequestBody BookingEntity booking) {
        Date checkinDate = booking.getCheckinDate();
        Date checkoutDate = booking.getCheckoutDate();
        long checkinTime = checkinDate.getTime();
        long checkoutTime = checkoutDate.getTime();

// Tính sự khác biệt giữa hai thời điểm tính bằng mili giây
        long timeDifference = checkoutTime - checkinTime;

// Chuyển đổi sự khác biệt thành số ngày (1 ngày = 24 * 60 * 60 * 1000 mili giây)
        long daysDifference = timeDifference / (24 * 60 * 60 * 1000);
        int roomnumber = booking.getRoomNumber();
        RoomEntity room = roomRepository.findById(roomnumber).get();
        String statusRoom = room.getStatus();
        if (statusRoom.equals("Using")) {
            return (long) -1;
        }
        Integer roomTypeID = room.getTypeID();
        RoomTypeEntity roomType = roomtypeRepository.findById(roomTypeID).get();
        Float giatien = roomType.getPricepernight();

        Float thanhtien = (Float) (giatien*daysDifference);
        booking.setTotalPrice(thanhtien);
        bookingRepository.save(booking);
        return (long) (giatien*daysDifference);
    }

    @GetMapping(path = "/payments/getPaymentsPending")
    public List<BookingEntity>  getBookingWithoutPays() {
        List<PaymentEntity> listPay = paymentRepository.findAll();
        List<BookingEntity> lisBooking = bookingRepository.findAll();
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

    @GetMapping(path = "/payments/addpaymentsFromBooking")
    public List<PaymentEntity> addPaymentsFromBooking(@RequestBody List<String> listBookID) {
        List<PaymentEntity> listpay = new ArrayList<>();
        for (String bookID : listBookID) {
            String[] part = bookID.split("_");
            Integer book_ID = Integer.valueOf(part[0]);
            String MethodPayments = part[1];
            BookingEntity book = bookingRepository.findById(book_ID).get();
            Float Price = book.getTotalPrice();
            PaymentEntity payment = new PaymentEntity();


            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd"); // Định dạng chuỗi mong muốn
            String formattedDateString = today.format(formatter);
            payment.setPaymentDate(formattedDateString);
            payment.setPaymentMethod(MethodPayments);
            payment.setAmount(Price);
            payment.setBookingid(book_ID);
            listpay.add(payment);
        }
        for (PaymentEntity pay : listpay) {
            paymentRepository.save(pay);
        }
        return listpay;
    }

}