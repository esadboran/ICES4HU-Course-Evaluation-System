package com.example.demo.registration;

import com.example.demo.appuser.AppUserRole;
import lombok.*;
import org.springframework.stereotype.Component;
@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private final String name;
    private final String email;
    private final String password;
    private AppUserRole role;
    private final String address;
    private final String phoneNumber;
    private final String userId;

}
