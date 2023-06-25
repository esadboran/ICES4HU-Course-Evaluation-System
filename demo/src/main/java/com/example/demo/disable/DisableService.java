package com.example.demo.disable;

import com.example.demo.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class DisableService {

    private final AppUserService appUserService;

    @Transactional
    public void disable(String email) {
         appUserService.deleteAppUser(email);
    }
}
