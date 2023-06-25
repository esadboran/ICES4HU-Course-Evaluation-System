package com.example.demo.updateprofile;

import com.example.demo.appuser.AppUserRole;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class UpdateProfileRequest {
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String address;
}
