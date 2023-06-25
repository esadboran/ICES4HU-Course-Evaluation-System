package com.example.demo.forgotpassword;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class ForgotPasswordRequest {
    private String email;
    private String userId;


}
