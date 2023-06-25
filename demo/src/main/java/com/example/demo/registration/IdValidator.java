package com.example.demo.registration;
import org.springframework.stereotype.Service;

import java.util.function.Predicate;

@Service
public class IdValidator implements Predicate<String> {

    @Override
    public boolean test(String s) {
        // TODO regex to validate id
        //make a regex that if it starts with one the letters 's, d, i' and anything can come after it
        //regex student that starts with s and 10 things that can be anything

        String regexStudent = "^[s][0-9]{10}$";

        String regexInstructor = "^[i][0-9]{8}$";

        String regexDepartmentManager = "^[d][0-9]{8}$";





        if (!s.matches(regexStudent) && !s.matches(regexInstructor) && !s.matches(regexDepartmentManager)) {
            throw new IllegalStateException("id not valid");
        }



        return true;
    }
}
