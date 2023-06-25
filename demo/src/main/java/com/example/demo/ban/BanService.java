package com.example.demo.ban;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class BanService {
    private final AppUserService appUserService;
    public void ban(BanRequest request) {
         appUserService.ban(request);

    }
}
