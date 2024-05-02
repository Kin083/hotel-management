package com.example.HotelManager.API;

import com.example.HotelManager.Entity.*;
import com.example.HotelManager.Repository.*;
import com.example.HotelManager.Service.*;
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
    @Autowired
    private MainService mainService;
    @Autowired
    private BookingService bookingService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomTypeService roomTypeService;

    @Autowired
    private PaymentsService paymentsService;

    @Autowired
    private StaffService staffService;
    @Autowired
    private HotelService hotelService;

    @Autowired
    private GuestService guestService;





    @GetMapping(path="/getallBooking")
    public @ResponseBody Iterable<BookingEntity> getAllBooking() {
        // This returns a JSON or XML with the users
        return bookingService.getAllBooking();
    }
    @GetMapping(path= "/getallGuest")
    public @ResponseBody Iterable<GuestEntity> getAllGuests() {
        return guestService.getAllGuest();
    }
    @GetMapping(path = "/getallHotel")
    public @ResponseBody Iterable<HotelEntity> getAllHotel() {
        return hotelService.getAllHotel();
    }
//    This function will response all data about the payments which haved been payed
    @GetMapping(path = "/getallPayments")
    public @ResponseBody List<PaymentEntity> getAllPayments() {
        return paymentsService.getAllPayments();
    }

    @GetMapping(path = "/getTypeRoomByID/{id}")
    public PaymentEntity getDataByID(@PathVariable int id) {
        return paymentsService.getPaymentByID(id);
    }

    //This function will set from using room to Active room
    @GetMapping(path = "/updateStatusRoomUsing2Active/{id}")
    public String updateStatusUsing2Active(@PathVariable int id) {
        return roomService.updateStatusUsing2Active(id);
    }

    //This function will set from Active room to using room
    @GetMapping(path = "/updateStatusRoomActive2Using/{id}")
    public String updateStatusActive2Using(@PathVariable int id) {
        return roomService.updateStatusActive2Using(id);
    }
    //hàm này để update các ttiin về booking, cho trường hợp khách muốn đổi ngày checkin-checkout,
    //hàm này chưa tính tiền ontime, sẽ có bổ sung.
    @PostMapping(path = "/updateBooking/{id}")
    public BookingEntity updateBookingInfo(@PathVariable int id,@RequestBody BookingEntity bookEntity)
    {
        return bookingService.updateBookingInfo(id,bookEntity);
    }
    @PostMapping(path="/HotelInformation/add")
    public HotelEntity addHotelInfor(@RequestBody HotelEntity hotel) {
        return hotelService.saveDetails(hotel);
    }
    @PostMapping(path = "/Roomtype/add")
    public RoomTypeEntity addRoomType(@RequestBody RoomTypeEntity roomtype) {
        return roomTypeService.saveDetails(roomtype);
    }
    @PostMapping(path = "/Room/add")
    public RoomEntity addRoom(@RequestBody RoomEntity roomen) {
            return  roomService.savedetails(roomen);
    }
    @PostMapping(path = "/Guest/add")
    public GuestEntity addRoom(@RequestBody GuestEntity guest) {
        return guestService.saveDetails(guest);
    }

    @PostMapping(path = "/payments/add")
    public PaymentEntity addpayment(@RequestBody PaymentEntity payment) {
        paymentsService.saveDetailPay(payment);
        return  payment;
    }
    //Hàm này thêm booking
    @PostMapping(path = "/BookingInfomation/add")
    public BookingEntity addBookingInfor(@RequestBody BookingEntity booking) {
        return bookingService.addBookingInfor(booking);
    }

    //hàm này thêm nhân viên
    @PostMapping(path = "/Staff/add")
    public StaffEntity addStaffInfor(@RequestBody StaffEntity staff) {
        return staffService.addInforStaff(staff);
    }

    //hàm này để tính tiền phòng dụư kiến (chưa kể phí dịch vụ và thời gian ở thêm)
    @PostMapping(path = "/booking/addInforcaculate")
    public Long addBookingInforCaculate(@RequestBody BookingEntity booking) {

        int roomnumber = booking.getRoomNumber();
        RoomEntity room = roomService.getRoom(roomnumber);
        Integer roomTypeID = room.getTypeID();
        RoomTypeEntity roomType = roomTypeService.getRoomTypeByID(roomTypeID);
        return bookingService.addBookingInforCaculate(booking,room,roomType);
    }

    //hàm này để liệt kê ra các booking chưa thanh toán
    @GetMapping(path = "/payments/getPaymentsPending")
    public List<BookingEntity>  getBookingWithoutPays() {
        List<PaymentEntity> listPay = paymentsService.getAllPayments();
        List<BookingEntity> lisBooking = bookingService.getAllBook();
        return mainService.getAllBookingPendings(listPay,lisBooking);
    }

    //hàm này dùng để đẩy các booking đã thanh toán vào payments
    @GetMapping(path = "/payments/addpaymentsFromBooking")
    public List<PaymentEntity> addPaymentsFromBooking(@RequestBody List<String> listBookID) {
        List<PaymentEntity> listpay = new ArrayList<>();
        for (String bookID : listBookID) {
            String[] part = bookID.split("_");
            Integer book_ID = Integer.valueOf(part[0]);
            String MethodPayments = part[1];
            BookingEntity book = bookingService.getBookingByID(book_ID);
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
            paymentsService.saveDetailPay(pay);
        }
        return listpay;
    }
//    @PostMapping(path = "/update/roomTYpe")
//    public RoomTypeEntity updateRoomtype(@RequestBody RoomTypeEntity roomType) {
//        Integer typeId = roomType.getTypeID();
//        RoomTypeEntity room  = roomtypeRepository.findById(typeId).get();
//        Integer Capacity = Integer.valueOf(roomType.getCapacity());
//        String Description = roomType.getDescription();
//        String name = roomType.getName();
//        Float price = roomType.getPricepernight();
//
//        room.setCapacity(Capacity.toString());
//        room.setName(name);
//        room.setDescription(Description);
//        room.setPricepernight(price);
//        roomtypeRepository.save(room);
//        return room;
//    }

}