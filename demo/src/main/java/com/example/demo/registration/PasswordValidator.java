package com.example.demo.registration;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;
@Service
public class PasswordValidator implements Predicate<String>{
    @Override
    public boolean test(String s) {
        // TODO regex to validate password
        // the password must have at least 8 chars and charters doesnt matter
        String regex = ".{8,}$";
        if (!s.matches(regex)) {
            throw new IllegalStateException("password not valid");
        }
        return true;
    }
}
