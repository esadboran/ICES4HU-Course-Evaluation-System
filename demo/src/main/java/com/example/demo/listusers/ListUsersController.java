package com.example.demo.listusers;


import com.example.demo.appuser.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/list")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ListUsersController {

    private final ListUsersService listUsersService;

    //list all users
    @RequestMapping("/all")
    @GetMapping
    public List<AppUser> listAllUsers() {
        return listUsersService.listAll();
    }

    //list students
    @RequestMapping("/students")
    @GetMapping
    public List<AppUser> listStudents() {
        return listUsersService.listStudents();
    }



    //list instructors
    @RequestMapping("/instructors")
    @GetMapping
    public List<AppUser> listInstructors() {
        return listUsersService.listInstructors();
    }


    //list department managers

    @RequestMapping("/departmentmanagers")
    @GetMapping
    public List<AppUser> listDepartmentManagers() {
        return listUsersService.listDepartmentManagers();
    }

    //non-enabled students
    @RequestMapping("/students/nonenabled")
    @GetMapping
    public List<AppUser> listNonEnabledStudents() {
        return listUsersService.listNonEnabledStudents();
    }
}
