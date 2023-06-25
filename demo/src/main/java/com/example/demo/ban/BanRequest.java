package com.example.demo.ban;


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
public class BanRequest {
    private final String email;
    private final boolean banned;
}
