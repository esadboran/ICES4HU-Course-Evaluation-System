package com.example.demo.login;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;

import org.apache.catalina.Authenticator;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping(path = "api/v1/login")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {



    private final LoginService loginService;
    private final AppUserRepository appUserRepository;
    @PostMapping
    public AppUser login(@RequestBody LoginRequest loginRequest){
        loginService.login(loginRequest);
        AppUser loggedInUser = appUserRepository.findByEmail(loginRequest.getEmail()).get();


        return loggedInUser;
    }
}