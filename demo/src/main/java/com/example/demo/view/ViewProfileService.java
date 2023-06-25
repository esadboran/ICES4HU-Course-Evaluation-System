package com.example.demo.view;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ViewProfileService {

    private final AppUserService appUserService;

    public AppUser view(ViewProfileRequest request) {
        return appUserService.view(request);
    }
}
