package com.example.demo.survey;

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
public class QuestionBank {

    @SequenceGenerator(
            name = "question_bank_sequence",
            sequenceName = "question_bank_sequence",
            allocationSize = 1)
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "question_bank_sequence")
    private Long id;

    private String question;

    public QuestionBank(String question) {
        this.question = question;
    }
}
