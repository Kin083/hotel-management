package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.BookingEntity;
import com.example.HotelManager.Entity.PaymentEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    public List<String> splitString(String date) {
        String start = "";
        String end = "";
        int i = 0;
        String temp = "";
        while(i<date.length()) {
            if(date.charAt(i) == '+') {
                start = temp;
                temp = "";
                i+=1;
                continue;
            }
            temp += date.charAt(i);
            i+=1;
        }
        end = temp;
        List<String> listdate = new ArrayList<>();
        listdate.add(start);
        listdate.add(end);
        return listdate;
    }

    public Map<String,Double> getBenefitByPayments(String time,PaymentsService paymentsService){
        Map<String,Double> ans = new HashMap<>();
        List<String> listdate =splitString(time);
        String start  = listdate.get(0);
        String end = listdate.get(1);

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date_start = LocalDate.parse(start, formatter);

        LocalDate date_end = LocalDate.parse(end,formatter);
        for(LocalDate date = date_start;date.isBefore(date_end);date = date.plusDays(1)){

            String dateString = date.format(formatter);

            List<PaymentEntity> listpay = paymentsService.getByDate(dateString);
            Double sum = 0.0;
            for(PaymentEntity pay : listpay) {
                Float s = pay.getAmount();
                sum+=s;
            }
            ans.put(dateString,sum);
        }
        return ans;
    }
}
