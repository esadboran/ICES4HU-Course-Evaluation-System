package com.example.demo.forgotpassword;

import com.example.demo.appuser.AppUserService;
import com.example.demo.email.EmailSender;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;

@Service
@AllArgsConstructor
public class ForgotPasswordService {

    private final EmailSender emailSender;
    private final AppUserService appUserService;
    final String ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";


    public void forgotPassword(ForgotPasswordRequest request){
        String password = generatePassword(8);
        appUserService.forgotPassword(password, request.getEmail());
        emailSender.send(request.getEmail(), password);
    }



    public String generatePassword(int length) {
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(ALPHABET.length());
            char randomChar = ALPHABET.charAt(randomIndex);
            password.append(randomChar);
        }

        return password.toString();
    }

}
