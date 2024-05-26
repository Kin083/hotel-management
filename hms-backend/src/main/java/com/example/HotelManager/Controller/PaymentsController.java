package com.example.HotelManager.Controller;

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

    @GetMapping(path = "/payment/getAll")
    public @ResponseBody List<PaymentEntity> getAllPayments() {
        return paymentsService.getAllPayments();
    }

//    @GetMapping(path = "/getTypeRoomByID/{id}")
//    public PaymentEntity getDataByID(@PathVariable int id) {
//        return paymentsService.getPaymentByID(id);
//    }


    @PostMapping(path = "/payment/add")
    public PaymentEntity addPayment(@RequestBody PaymentEntity payment) {
        paymentsService.saveDetailPay(payment);
        return  payment;
    }

    @GetMapping(path = "/getRevenue/Payments/{year}")
    public List<Double> getRevenue(@PathVariable String year) {
        System.out.println(year);
        return getBenefitByPaymentsByYear(year,paymentsService);
    }


    public List<Double> getBenefitByPaymentsByYear(String time,PaymentsService paymentsService){
        List<Double> ans = new ArrayList<>();
        for(int i = 1; i <= 12; i ++) {
            String t = String.valueOf(i);
            if(i < 10) {
                t = '0' + t;
            }
            String monthQuery = time + '-' + t;
            System.out.println(monthQuery);
            List<PaymentEntity> listPayMonth = paymentsService.getByYear(monthQuery);
            System.out.println(listPayMonth);
            Double sum = 0.0;
            for (PaymentEntity PayMonth : listPayMonth) {
                sum += PayMonth.getAmount();
            }
            ans.add(sum);
        }

        return ans;
    }
}
