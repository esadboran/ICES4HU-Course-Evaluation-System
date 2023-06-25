package com.example.demo.semester;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/semesterlist")
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")

public class SemesterController {

    private final SemesterService semesterService;
    private final SemesterRepo semesterRepo;
    //list all users
    @RequestMapping("/all")
    @GetMapping
    public List<Semester> listAllUsers() {
        return semesterService.listAll();
    }

}