package com.example.demo.email;

import jakarta.mail.MessagingException;

public interface EmailSender {
    void send(String to, String email);
    void sendHtmlEmail(String to, String content) throws MessagingException;
}