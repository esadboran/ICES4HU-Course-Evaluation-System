package com.example.demo.view;

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
public class ViewProfileRequest {
    private final String email;
    private final String password;
}
