package com.example.demo.survey;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class QuestionBankService {

    private QuestionBankRepository questionBankRepository;

    public void save(QuestionBank questionBank) {
        // if question is exist then throw exception
        if(0 != questionBankRepository.existsByQuestion(questionBank.getQuestion())){
            throw new IllegalStateException("Question is already exist");
        }

        // save question
        questionBankRepository.save(questionBank);
    }

    //list all questions
    public List<QuestionBank> listQuestions(){
        return questionBankRepository.findAll();
    }


    //find by question
    public QuestionBank findByQuestion(String question){
        return questionBankRepository.findByQuestion(question);
    }
}
