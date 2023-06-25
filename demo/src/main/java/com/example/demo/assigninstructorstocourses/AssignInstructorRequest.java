package com.example.demo.assigninstructorstocourses;


import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class AssignInstructorRequest {
    private String instructorId;
    private int courseCode;
}
