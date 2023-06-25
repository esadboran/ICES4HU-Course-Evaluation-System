package com.example.demo.assignstudentstocourses;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserService;
import com.example.demo.assigninstructorstocourses.AssignInstructorRequest;
import com.example.demo.semester.course.Course;
import com.example.demo.semester.course.CourseService;
import com.example.demo.takencourses.TakenCoursesService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AssignStudentService {
    private final CourseService courseService;
    private final TakenCoursesService takenCoursesService;
    private final AppUserService appUserService;

    public void assignStudent(AssignStudentRequest request){

        AppUser student = appUserService.findByUserId(request.getStudentId());
        Course course = courseService.findByCourseCode(request.getCourseCode());

        takenCoursesService.assignUserToCourse(student, course);


    }
}
