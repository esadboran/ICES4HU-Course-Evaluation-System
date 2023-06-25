package com.example.demo.semester;

import com.example.demo.semester.course.Course;
import com.example.demo.semester.course.CourseType;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class Semester {


    @SequenceGenerator(
            name = "semester_sequence",
            sequenceName = "semester_sequence",
            allocationSize = 1)
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "semester_sequence")

    private long id;

    private String semesterName;
    private Date startDate;
    private Date endDate;

    @OneToMany
    private List<Course> courses;

    public Semester(Date startDate, Date endDate, String semesterName) {
        this.semesterName = semesterName;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public Semester(Date startDate, Date endDate, List<Course> courses, String semesterName) {
        this.semesterName = semesterName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.courses = courses;
    }







}
