package com.example.demo.survey;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface QuestionBankRepository extends JpaRepository<QuestionBank, Long> {

    //check the question column and count the number questions where the question is equal to the question parameter
    @Query("SELECT COUNT(q) FROM QuestionBank q WHERE q.question = ?1")
    int existsByQuestion(String question);

    //find by question
    @Query("SELECT q FROM QuestionBank q WHERE q.question = ?1")
    QuestionBank findByQuestion(String question);

}
