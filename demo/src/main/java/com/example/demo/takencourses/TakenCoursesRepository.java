package com.example.demo.takencourses;

import com.example.demo.appuser.AppUser;
import com.example.demo.semester.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface TakenCoursesRepository extends JpaRepository<TakenCourses, Long> {

    //delete a given user's all taken courses
    void deleteAllByUser(AppUser user);

    //find all the courses that a user has taken by id
    @Query("SELECT t FROM TakenCourses t WHERE t.user.id = ?1")
    List<TakenCourses> findAllByUserId(Long userId);

    //find all the students in a course
    @Query("SELECT t FROM TakenCourses t WHERE t.course.id = ?1")
    List<TakenCourses> findAllByCourseId(Long courseId);






}
