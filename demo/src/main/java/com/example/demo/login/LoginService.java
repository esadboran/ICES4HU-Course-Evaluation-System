package com.example.demo.login;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class LoginService {
    private final AppUserService appUserService;
    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;




    public AppUser login(LoginRequest request){



        // check if email exists

        boolean userExists = appUserRepository.findByEmail(request.getEmail()).isPresent();
        if (!userExists) {
            throw new IllegalStateException("There no such user");
        }

        // check if password is correct
        if (!bCryptPasswordEncoder.matches(request.getPassword(), appUserRepository.findByEmail(request.getEmail()).get().getPassword())) {
            throw new IllegalStateException("Wrong password");
        }

        if (appUserRepository.findByEmail(request.getEmail()).get().getLocked()) {
            throw new IllegalStateException("User is locked");
        }

        // check if user is enabled and enabled by admin
        if (!appUserRepository.findByEmail(request.getEmail()).get().getEnabled() || !appUserRepository.findByEmail(request.getEmail()).get().getAdminEnabled()) {
            throw new IllegalStateException("User is not enabled");
        }






        return appUserService.login(request.getEmail(), request.getPassword());
    }

}
