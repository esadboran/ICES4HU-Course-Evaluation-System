package com.example.demo.survey;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SurveyRequest {
    private String surveyName;
    private String instructorId;
    private String courseCode;
    private String studentId;
    private String questionBank;
    private String answer;
}
