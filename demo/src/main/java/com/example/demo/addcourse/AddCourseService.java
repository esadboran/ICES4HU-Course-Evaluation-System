package com.example.demo.addcourse;

import com.example.demo.semester.Semester;
import com.example.demo.semester.SemesterService;
import com.example.demo.semester.course.Course;
import com.example.demo.semester.course.CourseService;
import com.example.demo.semester.course.CourseType;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AddCourseService {

    private final CourseService courseRepository;
    private final SemesterService semesterService;


    public void addCourse(AddCourseRequest request) {

        Semester semester = semesterService.getSemesterByName(request.getSemesterName());


        if (request.getCourseType().startsWith("R")){
            courseRepository.addCourse(new Course(request.getCourseCode(), request.getCourseName()
                    , request.getCourseCredit(), CourseType.REQUIRED, semester));
        }else{
            courseRepository.addCourse(new Course(request.getCourseCode(), request.getCourseName()
                    , request.getCourseCredit(), CourseType.ELECTIVE, semester));
        }


    }

}
