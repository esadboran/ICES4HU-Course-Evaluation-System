package com.example.demo.takencourses;

import com.example.demo.appuser.AppUser;
import com.example.demo.semester.course.Course;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class TakenCourses {



    @SequenceGenerator(
            name = "taken_course_sequence",
            sequenceName = "taken_course_sequence",
            allocationSize = 1)

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "taken_course_sequence")
    private Long id;


    @ManyToOne
    @JoinColumn(name = "course_id",nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(name = "user_id",nullable = false)
    private AppUser user;


    //constructor
    public TakenCourses(AppUser user, Course course) {
        this.course = course;
        this.user = user;
    }




}
