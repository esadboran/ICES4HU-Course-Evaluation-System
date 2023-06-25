package com.example.demo.enable;

import com.example.demo.appuser.AppUserRepository;
import com.example.demo.appuser.AppUserService;
import com.example.demo.appuser.admin.AdminRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
public class EnableService {


private final AppUserService appUserService;


    @Transactional
    public int enable(EnableRequest request) {
        return appUserService.enableByAdmin(request.getEmail());
    }

    @Transactional
    public void disable(String email) {
        appUserService.deleteAppUser(email);
    }
}
