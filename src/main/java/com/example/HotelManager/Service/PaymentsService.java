package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.PaymentEntity;
import com.example.HotelManager.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class PaymentsService {
    @Autowired
    private PaymentRepository paymentRepository;

    public PaymentEntity getPaymentByID(int id) {
        return paymentRepository.findById(id).get();
    }
    public List<PaymentEntity> getAllPayments()  {
        return paymentRepository.findAll();
    }
    public PaymentEntity saveDetailPay(PaymentEntity payment) {
        paymentRepository.save(payment);
        return payment;

    }
    public List<PaymentEntity> getByDate(String payment) {
        return paymentRepository.findByPaymentDate(payment);
    }
    public List<PaymentEntity> getByYear(String year) {
        return paymentRepository.findByPaymentYear(year);
    }

    public Map<String,Double> getBenefitByPaymentsByYear(String time){
        Map<String,Double> ans = new HashMap<>();
        for(int i = 1; i <= 12; i ++) {
            String t = String.valueOf(i);
            if(i<10) {
                t='0'+t;
            }
            String monthQuerry = time +'-'+t;
            System.out.println(monthQuerry);
            List<PaymentEntity> listPayMonth = getByYear(monthQuerry);
            Double sum = 0.0;
            for (PaymentEntity PayMonth : listPayMonth) {
                sum+=PayMonth.getAmount();
            }
            ans.put(t,sum);
        }
        TreeMap<String,Double> sortedmap = new TreeMap<>(ans);
        return sortedmap;
    }
}
