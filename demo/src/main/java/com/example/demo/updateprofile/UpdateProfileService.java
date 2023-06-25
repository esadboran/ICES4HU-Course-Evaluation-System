package com.example.demo.updateprofile;

import com.example.demo.appuser.AppUserRepository;
import com.example.demo.appuser.AppUserService;
import com.example.demo.appuser.admin.AdminRepo;
import com.example.demo.manageotheraccounts.ManageOtherAccountsRequest;
import com.example.demo.registration.EmailValidator;
import com.example.demo.registration.PasswordValidator;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor
public class UpdateProfileService {

private final AppUserService appUserService;
private final AppUserRepository appUserRepository;
private final EmailValidator emailValidator;
private final PasswordValidator passwordValidator;
private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Transactional
    public void updateProfile(UpdateProfileRequest request) {
        // keep the old values that are null

        String email;
        String name;
        String password;
        String phone;
        String address;

        // if any of the values are null error
        if (request.getEmail() == null ||
                request.getName() == null ||
                request.getPassword() == null) {
            throw new IllegalStateException("All necessary fields must be filled");
        }

        // if the email is not unique error
        /*if (appUserRepository.findByEmail(request.getEmail()).isPresent() ) {
            throw new IllegalStateException("Email already taken");
        }*/

        // if the email is not valid error
        if (!emailValidator.test(request.getEmail())) {
            throw new IllegalStateException("Email not valid");
        }

        // if the password is not valid error
        if (!passwordValidator.test(request.getPassword())) {
            throw new IllegalStateException("Password not valid");
        }

        email = request.getEmail();
        name = request.getName();
        password = request.getPassword();
        String encryptedPassword = bCryptPasswordEncoder.encode(password);
        phone = request.getPhoneNumber();
        address = request.getAddress();

        appUserService.updateInfo(email, name, encryptedPassword, phone, address);
    }



}
