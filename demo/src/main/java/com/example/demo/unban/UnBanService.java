package com.example.demo.unban;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UnBanService {
    private final AppUserService appUserService;
    public AppUser unban(UnBanRequest request) {
        return appUserService.unban(request);

    }
}
