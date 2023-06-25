package com.example.demo.registration;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration/instructor")
@AllArgsConstructor
public class RegistrationInstructorController {

    private final RegistrationService registrationService;
    @PostMapping
    public String register(@RequestBody() RegistrationRequest request){

        if (request.getUserId().startsWith("i")){
            return registrationService.register(request);
        } else {
            throw new IllegalStateException("user id must be an instructor id");
        }
    }
}
