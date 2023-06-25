package com.example.demo.takencourses;

import com.example.demo.appuser.AppUser;
import com.example.demo.semester.course.Course;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TakenCoursesService {

    private final TakenCoursesRepository takenCoursesRepository;

    //assign user to course
    public void assignUserToCourse(AppUser user, Course course) {

        //check if the user is already in the course if already in the course then throw an exception
        List<TakenCourses> takenCourses = takenCoursesRepository.findAllByUserId(user.getId());

        for (TakenCourses takenCourse : takenCourses) {
            if (takenCourse.getCourse().getId().equals(course.getId())) {
                throw new IllegalStateException("User already in the course");
            }
        }


        TakenCourses takenCourse = new TakenCourses(user, course);

        takenCoursesRepository.save(takenCourse);
    }

    //delete all taken courses of a user
    public void deleteAllTakenCoursesOfAUser(AppUser user) {
        takenCoursesRepository.deleteAllByUser(user);
    }


    //find all the courses that a user has taken
    public List<Course> findAllCoursesOfAUser(Long userId) {
        List<TakenCourses> courses = takenCoursesRepository.findAllByUserId(userId);

        //extract the courses from the list of TakenCourses
        return courses.stream().map(TakenCourses::getCourse).toList();
    }

    //find all the students in a course
    public List<AppUser> findStudentsByCourseCode(Long courseId){
        List<TakenCourses> students = takenCoursesRepository.findAllByCourseId(courseId);

        List<AppUser> users = students.stream().map(TakenCourses::getUser).toList();

        System.out.println(users);

        List<AppUser> pure_students = new java.util.ArrayList<>();

        //take only the students
        for (AppUser user : users){
            if (user.getUserId().startsWith("s")){
                pure_students.add(user);
            }
        }


        return pure_students;

    }

}
