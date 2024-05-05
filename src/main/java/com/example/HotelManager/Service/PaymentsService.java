package com.example.HotelManager.Service;

import com.example.HotelManager.Entity.PaymentEntity;
import com.example.HotelManager.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
