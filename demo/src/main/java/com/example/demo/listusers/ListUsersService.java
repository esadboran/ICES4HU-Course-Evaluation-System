package com.example.demo.listusers;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.appuser.AppUserRole;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@AllArgsConstructor
public class ListUsersService {
    private final AppUserRepository appUserRepository;

    //list all users
    public List<AppUser> listAll() {
        return appUserRepository.findAll();
    }

    //list students
    public List<AppUser> listStudents() {
        return appUserRepository.findAllByRole(AppUserRole.STUDENT);
    }

    //list instructors
    public List<AppUser> listInstructors() {
        return appUserRepository.findAllByRole(AppUserRole.INSTRUCTOR);
    }

    //list department managers
    public List<AppUser> listDepartmentManagers() {
        return appUserRepository.findAllByRole(AppUserRole.DEPARTMENT_MANAGER);
    }

    //non-enabled students
    public List<AppUser> listNonEnabledStudents() {
        return appUserRepository.findAllByRoleAndEnabled(AppUserRole.STUDENT, false);
    }


}
