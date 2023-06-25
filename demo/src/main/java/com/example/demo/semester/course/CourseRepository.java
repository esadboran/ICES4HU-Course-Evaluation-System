package com.example.demo.semester.course;

import com.example.demo.appuser.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    //find by course code
    @Query("SELECT c FROM Course c WHERE c.courseCode = ?1")
    Course findByCourseCode(int courseCode);









}
