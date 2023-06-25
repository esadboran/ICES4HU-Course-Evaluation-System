package com.example.demo.assigninstructorstocourses;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.appuser.AppUserService;
import com.example.demo.semester.course.Course;
import com.example.demo.semester.course.CourseRepository;
import com.example.demo.semester.course.CourseService;
import com.example.demo.takencourses.TakenCourses;
import com.example.demo.takencourses.TakenCoursesService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AssignInstructorService {

    private final CourseService courseService;
    private final TakenCoursesService takenCoursesService;
    private final AppUserService appUserService;

    public void assignInstructor(AssignInstructorRequest request){

        AppUser instructor = appUserService.findByUserId(request.getInstructorId());
        Course course = courseService.findByCourseCode(request.getCourseCode());

        takenCoursesService.assignUserToCourse(instructor, course);


    }

}
