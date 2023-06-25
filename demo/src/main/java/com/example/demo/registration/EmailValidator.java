package com.example.demo.registration;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class EmailValidator implements Predicate<String> {
    @Override
    public boolean test(String s) {
        // TODO regex to validate email
        String regex = ".*@cs\\.hacettepe\\.edu\\.tr.*";
        if (!s.matches(regex)) {
            throw new IllegalStateException("email not valid");
        }
        return true;
    }
}
