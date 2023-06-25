package com.example.demo.manageotheraccounts;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import org.springframework.context.annotation.Configuration;
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ManageOtherAccountsRequest {
    private final String userId;
    private final String email;
    private final String name;
    private final String address;
    private final String phoneNumber;
    private final String role;


}
