package com.example.demo.addcourse;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/add_course")
@AllArgsConstructor
public class AddCourseController {

    private final AddCourseService addCourseService;

    @PostMapping
    public void addCourse (@RequestBody() AddCourseRequest request){
        addCourseService.addCourse(request);
    }
}
