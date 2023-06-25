package com.example.demo.updateprofile;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.appuser.AppUserRole;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/updateProfile")
@AllArgsConstructor
public class UpdateProfileController {

    private final UpdateProfileService updateProfileService;
    private final AppUserRepository appUserRepository;

    @PutMapping
    public AppUser updateProfile(@RequestBody() UpdateProfileRequest request) {
        updateProfileService.updateProfile(request);
        AppUser loggedInUser = appUserRepository.findByEmail(request.getEmail()).get();

        return loggedInUser;
    }
}