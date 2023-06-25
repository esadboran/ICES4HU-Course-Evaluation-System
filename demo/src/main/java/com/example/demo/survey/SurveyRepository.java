package com.example.demo.survey;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public interface SurveyRepository extends JpaRepository<Survey, Long> {

    @Query("SELECT s FROM Survey s WHERE s.surveyName = ?1 AND s.instructor.userId = ?2 AND s.course.courseCode = ?3 AND s.student.userId = ?4 AND s.questionBank = ?5")
    Survey findBySurveyNameCourseCodeStudentIdQuestionBank(String surveyName, String instructorId, int courseCode, String studentId, QuestionBank questionBank);

    // set answer by id
    @Modifying
    @Query("UPDATE Survey s SET s.answer = :answer WHERE s.id = :id")
    void setBySurveyNameCourseCodeStudentIdQuestionBank(@Param("id") Long id, @Param("answer") String answer);


    //select all surveyname instructorid coursecode
    @Query("SELECT s FROM Survey s WHERE s.surveyName = ?1 AND s.instructor.userId = ?2 AND s.course.courseCode = ?3")
    List<Survey> findBySurveyNameInstructorIdCourseCode(String surveyName, String instructorId, int courseCode);


    //select all surveyname instructorid coursecode questionbank
    @Query("SELECT s FROM Survey s WHERE s.surveyName = ?1 AND s.instructor.userId = ?2 AND s.course.courseCode = ?3 AND s.questionBank.question = ?4")
    List<Survey> findBySurveyNameInstructorIdCourseCodeQuestionBank(String surveyName, String instructorId, int courseCode, String questionBank);

    //update publishedInstructo by id
    @Modifying
    @Query("UPDATE Survey s SET s.instructorPublished = true WHERE s.id = :id")
    void setInstructorPublished(@Param("id") Long id);

    //set admin published by id
    @Modifying
    @Query("UPDATE Survey s SET s.adminPublished = true WHERE s.id = :id")
    void setAdminPublished(@Param("id") Long id);

    //getDistinctSurveyNamesByStudentId
    @Query("SELECT DISTINCT s.surveyName FROM Survey s WHERE s.student.userId = ?1 AND s.studentPublished = false")
    List<String> getDistinctSurveyNamesByStudentIdNotPublished(String studentId);

    //findByStudentIdAndSurveyName
    @Query("SELECT s FROM Survey s WHERE s.student.userId = ?1 AND s.surveyName = ?2")
    List<Survey> findByStudentIdAndSurveyName(String studentId, String surveyName);



    //find by survey name
    @Query("SELECT s FROM Survey s WHERE s.surveyName = ?1")
    List<Survey> findBySurveyName(String surveyName);


    //findByInstructorIdCourseCodeInstructorPublished
    @Query("SELECT s FROM Survey s WHERE s.instructor.userId = ?1 AND s.surveyName = ?2 AND s.instructorPublished = ?3")
    List<Survey> findByInstructorIdCourseCodeInstructorPublished(String instructorId, String surveyName, boolean instructorPublished);


    //findByInstructorIdCourseCodeInstructorPublishedAdminPublished
    @Query("SELECT s FROM Survey s WHERE s.instructorPublished = ?1 AND s.adminPublished = ?2")
    List<Survey> findByInstructorPublishedAdminPublished(boolean instructorPublished, boolean adminPublished);

    //findByStudentIdInstructorPublishedandSurveyname
    @Query("SELECT s FROM Survey s WHERE s.student.userId = ?1 AND s.instructorPublished = ?2 AND s.surveyName = ?3")
    List<Survey> findByStudentIdInstructorPublishedandSurveyname(String studentId, boolean instructorPublished, String surveyName);

    //getDistinctSurveyNamesByInstructorIdInstructorPublished
    @Query("SELECT DISTINCT s.surveyName FROM Survey s WHERE s.instructor.userId = ?1 AND s.instructorPublished = ?2")
    List<String> getDistinctSurveyNamesByInstructorIdInstructorPublished(String instructorId, boolean instructorPublished);

    //setStudentPublished by id
    @Modifying
    @Query("UPDATE Survey s SET s.studentPublished = true WHERE s.id = :id")
    void setStudentPublished(@Param("id") Long id);

    //findByInstructorIdCourseCodeInstructorPublishedAdminPublished
    @Query("SELECT s FROM Survey s WHERE s.instructor.userId = ?1 AND s.course.courseCode = ?2 AND s.instructorPublished = ?3 AND s.adminPublished = ?4")
    List<Survey> findByInstructorIdCourseCodeInstructorPublishedAdminPublished(String instructorId, int courseCode, boolean instructorPublished, boolean adminPublished);

    //findByInstructorPublishedAdminPublishedDistinct  returns distinct survey names
    @Query("SELECT  s FROM Survey s WHERE s.instructorPublished = ?1 AND s.adminPublished = ?2")
    List<Survey> findByInstructorPublishedAdminPublishedDistinct(boolean instructorPublished, boolean adminPublished);

    //getAnswerForASpecificSurvey
    @Query("SELECT s.answer FROM Survey s WHERE s.surveyName = ?1 AND s.student.userId = ?2 AND s.questionBank.question = ?3")
    String getAnswerForASpecificSurvey(String surveyName, String studentId, String questionBank);

    //findByInstructorIdSurveyNameInstructorPublishedDistinctQuestion
    @Query("SELECT s FROM Survey s WHERE s.instructor.userId = ?1 AND s.surveyName = ?2 AND s.instructorPublished = ?3 " )
    List<Survey> findByInstructorIdSurveyNameInstructorPublishedDistinctQuestion(String instructorId, String surveyName, boolean instructorPublished);

    //findByStudentIdInstructorPublishedAdminPublished
    @Query("SELECT s FROM Survey s WHERE s.instructor.userId = ?1 AND s.instructorPublished = ?2 AND s.adminPublished = ?3")
    List<Survey> findByStudentIdInstructorPublishedAdminPublished(String studentId, boolean instructorPublished, boolean adminPublished);

    //findBySurveyNameInstructorId
    @Query("SELECT s FROM Survey s WHERE s.surveyName = ?1 AND s.instructor.userId = ?2")
    List<Survey> findBySurveyNameInstructorId(String surveyName, String instructorId);

}


