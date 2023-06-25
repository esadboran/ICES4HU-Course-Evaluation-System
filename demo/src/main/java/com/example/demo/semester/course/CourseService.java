package com.example.demo.semester.course;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.semester.SemesterRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseService {

    private final AppUserRepository appUserRepository;
    private final CourseRepository courseRepository;
    private final SemesterRepo semesterRepo;

    public void addCourse(Course course) {
        courseRepository.save(course);
    }

    public Course findByCourseCode(int courseCode) {
        return courseRepository.findByCourseCode(courseCode);
    }

    // return all courses
    public List<Course> findAllCourses() {
        return courseRepository.findAll();
    }


}
