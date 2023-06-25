package com.example.demo.survey;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class QuestionRequest {
    private String question;
    private String nonSense;
}
