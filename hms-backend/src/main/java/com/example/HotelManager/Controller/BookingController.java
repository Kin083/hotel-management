package com.example.HotelManager.Controller;

import com.example.HotelManager.Entity.BookingEntity;
import com.example.HotelManager.Entity.PaymentEntity;
import com.example.HotelManager.Entity.RoomEntity;
import com.example.HotelManager.Entity.RoomTypeEntity;
import com.example.HotelManager.Service.BookingService;
import com.example.HotelManager.Service.PaymentsService;
import com.example.HotelManager.Service.RoomService;
import com.example.HotelManager.Service.RoomTypeService;
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
    private RoomService roomService;

    @Autowired
    private RoomTypeService roomTypeService;
    @Autowired
    private PaymentsService paymentsService;

    @GetMapping(path="/booking/getAll")
    public @ResponseBody Iterable<BookingEntity> getAllBooking() {
        // This returns a JSON or XML with the users
        return bookingService.getAllBooking();
    }
    //hàm này để update các infor về booking, cho trường hợp khách muốn đổi ngày checkin-checkout,
    //hàm này chưa tính tiền ontime, sẽ có bổ sung.
    @PostMapping(path = "/booking/update/{id}")
    public BookingEntity updateBooking(@PathVariable int id, @RequestBody BookingEntity bookEntity) {
        return bookingService.updateBooking(id, bookEntity);
    }
    @PostMapping(path = "/booking/add")
    public BookingEntity addBooking(@RequestBody BookingEntity booking) {
        return bookingService.addBooking(booking);
    }
    @PostMapping(path = "/booking/addInforCaculate")
    public Long addBookingInforCaculate(@RequestBody BookingEntity booking,@RequestParam int amount) {

        int roomNumber = booking.getRoomNumber();
        RoomEntity room = roomService.getRoom(roomNumber);
        Integer roomTypeId = room.getTypeId();
        RoomTypeEntity roomType = roomTypeService.getRoomTypeById(roomTypeId);
        return bookingService.addBookingInforCaculate(booking, room, roomType, amount);
    }

    //hàm này để tính tiền phòng dụư kiến (chưa kể phí dịch vụ và thời gian ở thêm)

    //hàm này để liệt kê ra các booking chưa thanh toán
    @GetMapping(path = "/payments/getPaymentsPending")
    public List<BookingEntity> getBookingWithoutPays() {
        List<PaymentEntity> listPay = paymentsService.getAllPayments();
        List<BookingEntity> listBooking = (List<BookingEntity>) bookingService.getAllBooking();
        return getAllBookingPending(listPay,listBooking);
    }

    private List<BookingEntity> getAllBookingPending(List<PaymentEntity> listPay, List<BookingEntity> lisBooking) {
        List<BookingEntity> lisPendBooking = new ArrayList<>();
        for (BookingEntity book : lisBooking) {
            Integer bookingId = book.getBookingId();
            boolean needAdded = true;
            for (PaymentEntity pay : listPay) {
                Integer bookingId_pay = pay.getBookingId();
                if (bookingId == bookingId_pay) {
                    needAdded = false;
                    break;
                }
            }
            if (needAdded){
                lisPendBooking.add(book);
            }
        }
        return lisPendBooking;
    }

    //hàm này dùng để đẩy các booking đã thanh toán vào payments
    @GetMapping(path = "/payments/addPaymentsFromBooking")
    public List<PaymentEntity> addPaymentsFromBooking(@RequestBody List<String> listBookID) {
        List<PaymentEntity> listpay = new ArrayList<>();
        for (String bookID : listBookID) {
            String[] part = bookID.split("_");
            Integer book_ID = Integer.valueOf(part[0]);
            String MethodPayments = part[1];
            BookingEntity book = bookingService.getBookingByID(book_ID);
            Double Price = book.getTotalPrice();
            PaymentEntity payment = new PaymentEntity();

            LocalDate today = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM/dd"); // Định dạng chuỗi mong muốn
            String formattedDateString = today.format(formatter);
            payment.setPaymentDate(formattedDateString);
            payment.setPaymentMethod(MethodPayments);
            payment.setAmount(Price);
            payment.setBookingId(book_ID);
            listpay.add(payment);
        }
        for (PaymentEntity pay : listpay) {
            paymentsService.saveDetailPay(pay);
        }
        return listpay;
    }
}
