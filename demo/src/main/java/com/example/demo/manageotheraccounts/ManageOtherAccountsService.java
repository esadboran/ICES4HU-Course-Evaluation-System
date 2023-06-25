package com.example.demo.manageotheraccounts;


import com.example.demo.appuser.AppUserService;
import com.example.demo.registration.EmailValidator;
import com.example.demo.updateprofile.UpdateProfileRequest;
import com.example.demo.updateprofile.UpdateProfileService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@AllArgsConstructor
@Service
public class ManageOtherAccountsService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;


    public void updateOtherAccounts(ManageOtherAccountsRequest request) {// keep the old values that are null

        String email;
        String name;
        String phone;
        String address;
        String role;
        String userId;

        // if any of the values are null error
        if (request.getEmail() == null ||
                request.getName() == null) {
            throw new IllegalStateException("All necessary fields must be filled");
        }

        // if the email is not valid error
        if (!emailValidator.test(request.getEmail())) {
            throw new IllegalStateException("Email not valid");
        }

        email = request.getEmail();
        name = request.getName();
        phone = request.getPhoneNumber();
        address = request.getAddress();
        role = request.getRole();
        userId = request.getUserId();

        appUserService.updateInfoByAdmin(email, name, phone, address, role, userId);


    }
}

