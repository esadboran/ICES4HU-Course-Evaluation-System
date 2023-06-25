package com.example.demo.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService implements EmailSender {

    private final static Logger LOGGER = org.slf4j.LoggerFactory.getLogger(EmailService.class);



    private final JavaMailSender mailSender ;


    //html email sender

    @Async
    public void sendHtmlEmail(String to, String content) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setTo(to);
        helper.setSubject("Confirm your email");
        helper.setText(content, true);
        mailSender.send(message);
    }






    @Override
    @Async
    public void send(String to, String email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Confirm your email");
            message.setText(email);



            mailSender.send(message);
        } catch (Exception e) {
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }
    }

    @Async
    public void sendPassword(String to, String email) {
        try {

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Here is your password");
            message.setText(email);
            mailSender.send(message);
        } catch (Exception e) {
            LOGGER.error("failed to send email", e);
            throw new IllegalStateException("failed to send email");
        }
    }

}