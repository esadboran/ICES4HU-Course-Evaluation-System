package com.example.demo.addservice;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/add_semester")
@AllArgsConstructor
public class AddSemesterController {

    private final AddSemesterService addSemesterService;

    @PostMapping
    public void addSemester(@RequestBody() AddSemesterRequest request){
        addSemesterService.addSemester(request);
    }



}
