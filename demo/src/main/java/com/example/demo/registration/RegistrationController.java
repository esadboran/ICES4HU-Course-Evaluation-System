package com.example.demo.registration;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/registration")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;
    @PostMapping
    public String register(@RequestBody() RegistrationRequest request ){
        if (!request.getUserId().startsWith("i")){
            return registrationService.register(request);
        } else {
            throw new IllegalStateException("user id must be a student id or department manager id");
        }
    }

    @PostMapping(path = "/admin")
    public void registerAdmin(){
        registrationService.registerAdmin();
    }




    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        return registrationService.confirmToken(token);
    }

}

