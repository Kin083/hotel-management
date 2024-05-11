package com.example.HotelManager.API;

import com.example.HotelManager.Entity.PaymentEntity;
import com.example.HotelManager.Service.PaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class PaymentsController {
    @Autowired
    private PaymentsService paymentsService;

    @GetMapping(path = "/getallPayments")
    public @ResponseBody List<PaymentEntity> getAllPayments() {
        return paymentsService.getAllPayments();
    }

    @GetMapping(path = "/getTypeRoomByID/{id}")
    public PaymentEntity getDataByID(@PathVariable int id) {
        return paymentsService.getPaymentByID(id);
    }


    @PostMapping(path = "/payments/add")
    public PaymentEntity addpayment(@RequestBody PaymentEntity payment) {
        paymentsService.saveDetailPay(payment);
        return  payment;
    }

    @PostMapping(path = "/getBenefit/payments")
    public Map<String,Double> getInforAboutBenefit(@RequestBody String time) {
        return getBenefitByPayments(time,paymentsService);
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

}
