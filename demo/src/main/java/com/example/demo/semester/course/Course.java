package com.example.demo.semester.course;

import com.example.demo.appuser.AppUser;
import com.example.demo.semester.Semester;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
public class Course {


    @SequenceGenerator(
            name = "course_sequence",
            sequenceName = "course_sequence",
            allocationSize = 1)

    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "course_sequence")

    private Long id;


    private int courseCode;
    private String courseName;
    private int courseCredit;
    @Enumerated (EnumType.STRING)
    private CourseType courseType;

    @ManyToOne
    @JoinColumn(name = "semester_id",nullable = false)
    private Semester semester;







    public Course(int courseCode, String courseName, int courseCredit, CourseType courseType, Semester semester) {
        this.courseCode = courseCode;
        this.courseName = courseName;
        this.courseCredit = courseCredit;
        this.courseType = courseType;
        this.semester = semester;


    }





}
