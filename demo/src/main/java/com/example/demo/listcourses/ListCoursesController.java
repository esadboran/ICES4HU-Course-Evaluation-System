package com.example.demo.listcourses;


import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.semester.course.Course;
import com.example.demo.semester.course.CourseService;
import com.example.demo.takencourses.TakenCoursesService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/listcourses")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class ListCoursesController {

    private final TakenCoursesService takenCoursesService;
    private final CourseService courseService;
    private final AppUserService appUserService;

    //list all courses
    @RequestMapping("/all")
    @GetMapping
    public List<Course> listAllCourses(){
        return courseService.findAllCourses();
    }

    //list all courses of a user
    @RequestMapping("/user")
    @GetMapping
    public List<Course> listAllCoursesOfAUser(@RequestParam("userId") String userId){
        AppUser user = appUserService.findByUserId(userId);
        return takenCoursesService.findAllCoursesOfAUser(user.getId());
    }

}
