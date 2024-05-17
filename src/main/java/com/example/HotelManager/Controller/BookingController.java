package com.example.HotelManager.Controller;

import com.example.HotelManager.Entity.*;
import com.example.HotelManager.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private GuestService guestService;
    @Autowired
    private RoomService roomService;

    @Autowired
    private RoomTypeService roomTypeService;
    @Autowired
    private PaymentsService paymentsService;

    @GetMapping(path="/getallBooking")
    public @ResponseBody Iterable<BookingEntity> getAllBooking() {
        System.out.println("ok da vao den day");
        // This returns a JSON or XML with the users
        return bookingService.getAllBooking();
    }
    //hàm này để update các ttiin về booking, cho trường hợp khách muốn đổi ngày checkin-checkout,
    //hàm này chưa tính tiền ontime, sẽ có bổ sung.
    @PostMapping(path = "/updateBooking/{id}")
    public BookingEntity updateBookingInfo(@PathVariable int id, @RequestBody BookingEntity bookEntity)
    {
        return bookingService.updateBookingInfo(id,bookEntity);
    }
    @PostMapping(path = "/BookingInfomation/add")
    public BookingEntity addBookingInfor(@RequestBody BookingEntity booking) {
        return bookingService.addBookingInfor(booking);
    }
    @PostMapping(path = "/booking/addInforcaculate")
    public Long addBookingInforCaculate(@RequestBody BookingEntity booking,@RequestParam int soluong) {

        int roomnumber = booking.getRoomNumber();
        RoomEntity room = roomService.getRoom(roomnumber);
        Integer roomTypeID = room.getTypeID();
        RoomTypeEntity roomType = roomTypeService.getRoomTypeByID(roomTypeID);
        return bookingService.addBookingInforCaculate(booking,room,roomType,soluong);
    }

    //hàm này để tính tiền phòng dụư kiến (chưa kể phí dịch vụ và thời gian ở thêm)

    //hàm này để liệt kê ra các booking chưa thanh toán
    @GetMapping(path = "/payments/getPaymentsPending")
    public List<BookingEntity> getBookingWithoutPays() {
        List<PaymentEntity> listPay = paymentsService.getAllPayments();
        List<BookingEntity> lisBooking = bookingService.getAllBook();
        return getAllBookingPendings(listPay,lisBooking);
    }

    private List<BookingEntity> getAllBookingPendings(List<PaymentEntity> listPay ,List<BookingEntity> lisBooking) {
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
    @GetMapping("/gettest")
    public List<ResponseForUsingRoomInformation> gettest() {
        return bookingService.getInforBookingAndGuest(guestService);
    }

}
