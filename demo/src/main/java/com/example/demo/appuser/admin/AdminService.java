package com.example.demo.appuser.admin;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@RequestMapping
public class AdminService implements UserDetailsService {

    private AdminRepo adminRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return adminRepo.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format("Username %s not found", email)));
    }




    @PostMapping("/admin/enable")
    public int enableStudent(String email) {
        return adminRepo.enableStudent(email) ;
    }
}
