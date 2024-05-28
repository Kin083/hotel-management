<<<<<<< HEAD
package com.example.HotelManager.Service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    private final JavaMailSender emailSender;

    @Autowired
    public EmailSenderService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public String sendAuthenticationEmail(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        String uuid = UUID.randomUUID().toString();
        message.setTo(recipientEmail);
        message.setSubject("Xác thực tài khoản gmail");
        message.setText("Xin chào,\n\n Đây là mã xác thực của bạn: \n" + uuid);
        emailSender.send(message);
        System.out.println("Mail Sent successfully");
        return uuid; // Trả về uuid để sử dụng trong controller
    }
}

=======
package com.example.HotelManager.Service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailSenderService {

    private final JavaMailSender emailSender;

    @Autowired
    public EmailSenderService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    public String sendAuthenticationEmail(String recipientEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        String uuid = UUID.randomUUID().toString();
        message.setTo(recipientEmail);
        message.setSubject("Xác thực tài khoản gmail");
        message.setText("Xin chào,\n\n Đây là mã xác thực của bạn: \n" + uuid);
        emailSender.send(message);
        System.out.println("Mail Sent successfully");
        return uuid; // Trả về uuid để sử dụng trong controller
    }
}

>>>>>>> tuananh
