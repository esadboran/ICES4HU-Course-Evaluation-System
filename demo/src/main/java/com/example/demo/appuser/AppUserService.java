package com.example.demo.appuser;

import com.example.demo.ban.BanRequest;
import com.example.demo.registration.token.ConfirmationToken;
import com.example.demo.registration.token.ConfirmationTokenService;
import com.example.demo.takencourses.TakenCoursesService;
import com.example.demo.unban.UnBanRequest;
import com.example.demo.view.ViewProfileRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service // This annotation tells Spring that this class is a service class
@AllArgsConstructor
public class AppUserService implements UserDetailsService {

    private final static String USER_NOT_FOUND_MSG = "user with email %s not found";

    private final AppUserRepository appUserRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    private final TakenCoursesService takenCoursesService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));

        // Create and return UserDetails object
        return new User(
                appUser.getEmail(),
                appUser.getPassword(),
                appUser.isEnabled(),
                appUser.isAccountNonExpired(),
                appUser.isCredentialsNonExpired(),
                appUser.isAccountNonLocked(),
                appUser.getAuthorities()
        );

    }

    public String signUpUser(AppUser appUser) {
        boolean userExists = appUserRepository.findByEmail(appUser.getEmail()).isPresent();

        if (userExists) {
            throw new IllegalStateException("email already taken");
        }

        boolean userIdExists = appUserRepository.findByUserId(appUser.getUserId()).isPresent();

        if (userIdExists) {
            throw new IllegalStateException("userId already taken");
        }


        String encodedPassword = bCryptPasswordEncoder.encode(appUser.getPassword());


        appUser.setPassword(encodedPassword);

        // if user is a instructor or department manager, then set enabled to true
        if (appUser.getUserId().startsWith("i") || appUser.getUserId().startsWith("d")){
            appUser.setEnabled(true);
            appUser.setAdminEnabled(true);
        }

        appUserRepository.save(appUser);

        // TODO send confirmation token
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(15),
                appUser
        );

        confirmationTokenService.saveConfirmationToken(confirmationToken);

        //TODO send email

        return token;
    }

    public int enableAppUser(String email) {
        return appUserRepository.enableAppUser(email);
    }

    public int enableByAdmin(String email) {
        return appUserRepository.enableByAdmin(email);
    }

    public AppUser login(String email, String password){
        return appUserRepository.login(email, password);
    }


    public void deleteAppUser(String email) {




        // get appUser by email
        // then delete all taken courses of that user

        AppUser appUser = appUserRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));
        takenCoursesService.deleteAllTakenCoursesOfAUser(appUser);

        //delete confirmation token
        confirmationTokenService.deleteConfirmationToken(email);

        //delete appUser
        Long id = appUserRepository.getIdByEmail(email);
        appUserRepository.deleteById(id);
    }

    public void updateInfo(String email, String name, String password, String phone, String address) {
        appUserRepository.updateInfo(email, name, password, phone, address);
    }

    public void updateInfoByAdmin(String email, String name,  String phone, String address, String role, String userId) {
        AppUserRole appUserRole = AppUserRole.valueOf(role);
        appUserRepository.updateInfoByAdmin(email, name, phone, address, appUserRole, userId);
    }

    public void ban(BanRequest request) {
         appUserRepository.ban(request.getEmail());
    }

    public AppUser unban(UnBanRequest request) {
        return appUserRepository.unban(request.getEmail());
    }

    public AppUser view(ViewProfileRequest request) {
        return appUserRepository.view(request.getEmail());
    }


    public AppUser findByUserId(String userId) {
        return appUserRepository.findByUserId(userId).orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, userId)));
    }


    public void forgotPassword(String password, String email){

        String encodedPassword = bCryptPasswordEncoder.encode(password);
        appUserRepository.updatePassword(email, encodedPassword);
    }




}
