package com.example.demo.survey;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRole;
import com.example.demo.semester.course.Course;
import jakarta.persistence.*;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class Survey {


    @SequenceGenerator(
            name = "survey_sequence",
            sequenceName = "survey_sequence",
            allocationSize = 1)
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "survey_sequence")

    private Long id;

    private String surveyName;


    @ManyToOne
    @JoinColumn(nullable = false)
    private AppUser instructor;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Course course;

    @ManyToOne
    @JoinColumn(nullable = false)
    private AppUser student;

    @ManyToOne
    @JoinColumn(nullable = false)
    private QuestionBank questionBank;

    private String answer;

    //1st admin will check if survey is published by instructor
    private boolean instructorPublished = false;

    //2nd admin will check if survey is published by admin
    private boolean adminPublished = false;

    //to instructor to see if survey answered by student
    private boolean studentPublished = false;







    public Survey(String surveyName, AppUser instructor, Course course, AppUser student, QuestionBank questionBank) {
        this.surveyName = surveyName;
        this.instructor = instructor;
        this.course = course;
        this.student = student;
        this.questionBank = questionBank;
    }


}
