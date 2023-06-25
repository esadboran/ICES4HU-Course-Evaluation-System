package com.example.demo.survey;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/survey")
@CrossOrigin(origins = "http://localhost:3000")
@AllArgsConstructor
public class AddSurveyController {

    private QuestionBankService questionBankService;
    private SurveyService surveyService;


    @RequestMapping("/add_question")
    @PostMapping
    public void addQuestionToBank(@RequestBody QuestionRequest request){
        questionBankService.save(new QuestionBank(request.getQuestion()));
    }


    @RequestMapping("/add_survey")
    @PostMapping
    public void addSurvey(@RequestBody SurveyRequest request){

        int courseCode = Integer.parseInt(request.getCourseCode());

        surveyService.addSurvey(request.getSurveyName(), request.getInstructorId()
                , courseCode, request.getQuestionBank());
    }

    @RequestMapping("/answer_survey")
    @PutMapping
    public void answerSurvey(@RequestBody SurveyRequest request){
        surveyService.answerSurvey(request.getSurveyName(), request.getInstructorId()
                , request.getCourseCode(), request.getStudentId(), request.getQuestionBank(), request.getAnswer());
    }


    @RequestMapping("/delete_surveys_on_cancel")
    @DeleteMapping
    public void deleteSurveysOnCancel(@RequestBody SurveyRequest request){
        surveyService.deleteSurveysOnCancel(request.getSurveyName(), request.getInstructorId()
                , request.getCourseCode());
    }

    @RequestMapping("/delete_specific_survey")
    @DeleteMapping
    public void deleteSpecificSurvey(@RequestBody SurveyRequest request){
        surveyService.deleteSpecificSurvey(request.getSurveyName(), request.getInstructorId()
                , request.getCourseCode(), request.getQuestionBank());
    }


    @RequestMapping("/publish_survey")
    @PutMapping
    public void publishSurvey(@RequestBody SurveyRequest request){
        surveyService.publishSurvey(request.getSurveyName(), request.getInstructorId()
                , request.getCourseCode());
    }

    //publish survey admin
    @RequestMapping("/publish_survey_admin")
    @PutMapping
    public void publishSurveyAdmin(@RequestBody SurveyRequest request){
        surveyService.publishSurveyAdmin(request.getSurveyName(), request.getInstructorId()
                , request.getCourseCode());
    }

    //publish student submit
    @RequestMapping("/publish_student_submit")
    @PutMapping
    public void publishStudentSubmit(@RequestBody SurveyRequest request){
        surveyService.publishStudentSubmit(request.getStudentId(), request.getSurveyName());
    }




    //bir öğrenci bir anket all true
















    //get distinc survey names by student id
    @RequestMapping("/get_distinct_survey_names_by_student_id")
    @GetMapping
    public List<String> getDistinctSurveyNamesByStudentIdNotSubmitted(@RequestParam("userId") String userId){
        return surveyService.getDistinctSurveyNamesByStudentIdNotSubmitted(userId);
    }



    //get surveys by survey name and student id
    @RequestMapping("/get_surveys_by_survey_name_and_student_id")
    @GetMapping
    public List<Survey> getSurveysBySurveyNameAndStudentId(@RequestParam("surveyName") String surveyName, @RequestParam("userId") String userId){
        return surveyService.getSurveysByStudentIdAndSurveyName(userId, surveyName);
    }







    // get saved but not published surveys by instructor id and survey name
    @RequestMapping("/get_saved_but_not_published_surveys")
    @GetMapping
    public List<Survey> getSavedButNotPublishedSurveys(@RequestParam("surveyName") String surveyName, @RequestParam("userId") String userId){
        return surveyService.getSavedButNotPublishedSurveys(userId, surveyName);
    }









    // get instructorpublished=true but  admin published = false surveys by instructor id and survey name
    @RequestMapping("/get_published_but_not_admin_published_surveys")
    @GetMapping
    public List<Survey> getPublishedButNotAdminPublishedSurveys(){
        return surveyService.getPublishedButNotAdminPublishedSurveysDistinct();
    }









    // get instructorpublished=true and  admin published = true surveys by instructor id and survey name
    @RequestMapping("/get_published_and_admin_published_surveys")
    @GetMapping
    public List<Survey> getPublishedAndAdminPublishedSurveys( @RequestParam("userId") String userId){
        return surveyService.getPublishedAndAdminPublishedSurveys(userId);
    }














    //bunun için student id survey name olacak ve instructorPublished=true, adminPublished=true olacak ve studentPublished=true olacak
    // get instructorpublished=true and  admin published = true and student published = true surveys by student id and survey name
    @RequestMapping("/get_published_student_surveys")
    @GetMapping
    public List<Survey> getPublishedStudentSurveys(@RequestParam("surveyName") String surveyName, @RequestParam("userId") String userId){
        return surveyService.getPublishedStudentSurveys(userId, surveyName);
    }









    @RequestMapping("/listquestions")
    @GetMapping
    public List<QuestionBank> listQuestions(){
        return questionBankService.listQuestions();
    }







    @RequestMapping("/get_distinct_survey_names_by_instructor_id_not_published")
    @GetMapping
    public List<String> getDistinctNotPublished(@RequestParam("userId") String userId){
        return surveyService.getDistinctSurveyNamesNotPublished(userId);
    }



    //get answer for a specific survey
    @RequestMapping("/get_answer_for_a_specific_survey")
    @GetMapping
    public String  getAnswerForASpecificSurvey(@RequestParam("surveyName") String surveyName, @RequestParam("studentId") String studentId, @RequestParam("questionBank") String questionBank){
        return surveyService.getAnswerForASpecificSurvey(surveyName, studentId, questionBank);
    }



    //get all surveys that instructor published true and admin published true
    @RequestMapping("/get_all_surveys_admin_and_instructor_published_true")
    @GetMapping
    public List<Survey> getAllSurveysAdminAndInstructorPublishedTrue(){
        return surveyService.getAllSurveysAdminAndInstructorPublishedTrue();
    }

    @RequestMapping("/get_all_surveys_by_survey_name_and_instructor_id")
    @GetMapping
    public List<Survey> getAllSurveysBySurveyNameAndInstructorId(@RequestParam("surveyName") String surveyName, @RequestParam("userId") String userId){
        return surveyService.getAllSurveysBySurveyNameAndInstructorId(surveyName, userId);
    }


}
