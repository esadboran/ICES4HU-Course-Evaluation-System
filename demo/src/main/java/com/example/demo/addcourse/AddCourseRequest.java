package com.example.demo.addcourse;

import com.example.demo.appuser.AppUser;
import lombok.*;

import java.util.ArrayList;

@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AddCourseRequest {
    private int courseCode;
    private String courseName;
    private int courseCredit;
    private String courseType;
    private String semesterName;
    private ArrayList<AppUser> instructors;
    private ArrayList<AppUser> students;
}
