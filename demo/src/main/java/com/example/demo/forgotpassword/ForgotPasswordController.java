package com.example.demo.forgotpassword;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/forgot_password")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    @PutMapping
    public void forgotPassword(@RequestBody ForgotPasswordRequest request){
        forgotPasswordService.forgotPassword(request);
    }

}
