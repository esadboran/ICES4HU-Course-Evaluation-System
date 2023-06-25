package com.example.demo.assignstudentstocourses;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AssignStudentRequest {
    private String studentId;
    private int courseCode;
}
