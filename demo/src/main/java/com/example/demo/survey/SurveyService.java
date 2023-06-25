package com.example.demo.survey;

import com.example.demo.appuser.AppUser;
import com.example.demo.appuser.AppUserRepository;
import com.example.demo.semester.course.Course;
import com.example.demo.semester.course.CourseRepository;
import com.example.demo.semester.course.CourseService;
import com.example.demo.takencourses.TakenCoursesService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class SurveyService {

    private QuestionBankService questionBankService;
    private SurveyRepository surveyRepository;
    private AppUserRepository appUserRepository;
    private CourseRepository courseRepository;
    private CourseService courseService;
    private TakenCoursesService takenCoursesService;

    //add survey
    public void addSurvey(String surveyName, String instructorId, int courseCode, String questionBank){

        //find question object if it doesn't exist, create it

        QuestionBank questionObject = questionBankService.findByQuestion(questionBank);
        if (questionObject == null){
            questionObject = new QuestionBank(questionBank);
            questionBankService.save(questionObject);
        }

        AppUser instructorObject = appUserRepository.findByUserId(instructorId).get();
        //todo: maybe convert courseCode to string

        Course courseObject = courseRepository.findByCourseCode(courseCode);

        Long courseId = courseObject.getId();

        //find all students in given course code
        List<AppUser> students = takenCoursesService.findStudentsByCourseCode(courseId);

        //check if the given name already exists for the other course code if it is throw error "survey name already exists for another course"
        List<Survey> survey1 = surveyRepository.findBySurveyName(surveyName);

        for (Survey s : survey1){
            if (s.getCourse().getCourseCode() != courseCode){
                throw new IllegalStateException("Survey name already exists for another course");
            }
        }

        //check if survey already exists for each student if it does, throw error "survey question already sent"
        for (AppUser student : students){
            Survey survey = surveyRepository.findBySurveyNameCourseCodeStudentIdQuestionBank(surveyName
                    , instructorId, courseCode, student.getUserId(), questionObject);
            if (survey != null){
                throw new IllegalStateException("Survey question already sent");
            }
        }



        for (AppUser student : students){
            Survey survey = new Survey(surveyName, instructorObject, courseObject, student, questionObject);
            surveyRepository.save(survey);
        }

    }

    //answer survey
    @Transactional
    public void answerSurvey(String surveyName, String instructorId, String courseCode, String studentId, String questionBank, String answer){

        QuestionBank questionObject = questionBankService.findByQuestion(questionBank);

        int courseCodeInt = Integer.parseInt(courseCode);

        Survey survey = surveyRepository.findBySurveyNameCourseCodeStudentIdQuestionBank(surveyName
                , instructorId, courseCodeInt, studentId, questionObject);

        Long id = survey.getId();

        surveyRepository.setBySurveyNameCourseCodeStudentIdQuestionBank(id, answer);

    }


    //delete surveys on cancel
    @Transactional
    public void deleteSurveysOnCancel(String surveyName, String instructorId, String courseCode){

        int courseCodeInt = Integer.parseInt(courseCode);

        List<Survey> survey =surveyRepository.findBySurveyNameInstructorIdCourseCode(surveyName, instructorId, courseCodeInt);

        for (Survey s : survey){
            Long id = s.getId();
            surveyRepository.deleteById(id);
        }
    }


    //delete specific survey
    @Transactional
    public void deleteSpecificSurvey(String surveyName, String instructorId, String courseCode, String questionBank){



        int courseCodeInt = Integer.parseInt(courseCode);

        List<Survey> survey = surveyRepository.findBySurveyNameInstructorIdCourseCodeQuestionBank(surveyName, instructorId, courseCodeInt, questionBank);

        for (Survey s : survey){
            Long id = s.getId();
            surveyRepository.deleteById(id);
        }


    }


    //publish survey
    @Transactional
    public void publishSurvey(String surveyName, String instructorId, String courseCode){

        int courseCodeInt = Integer.parseInt(courseCode);

        List<Survey> survey = surveyRepository.findBySurveyNameInstructorIdCourseCode(surveyName, instructorId, courseCodeInt);

        for (Survey s : survey){
            Long id = s.getId();
            surveyRepository.setInstructorPublished(id);
        }
    }

    //publish survey admin
    @Transactional
    public void publishSurveyAdmin(String surveyName, String instructorId, String courseCode){

        int courseCodeInt = Integer.parseInt(courseCode);

        List<Survey> survey = surveyRepository.findBySurveyNameInstructorIdCourseCode(surveyName, instructorId, courseCodeInt);

        for (Survey s : survey){
            Long id = s.getId();
            surveyRepository.setAdminPublished(id);
        }
    }


    //get distinc survey names for given student id
    public List<String> getDistinctSurveyNamesByStudentIdNotSubmitted(String studentId){
        return surveyRepository.getDistinctSurveyNamesByStudentIdNotPublished(studentId);
    }

    //get surveys for given student id and survey name
    public List<Survey> getSurveysByStudentIdAndSurveyName(String studentId, String surveyName){
        return surveyRepository.findByStudentIdAndSurveyName(studentId, surveyName);
    }


    //getSavedButNotPublishedSurveys
    public List<Survey> getSavedButNotPublishedSurveys(String instructorId, String surveyName){






        //we will find distinct questions for each survey

        List<Survey> surveys = surveyRepository.findByInstructorIdSurveyNameInstructorPublishedDistinctQuestion(instructorId, surveyName, false);

        // group the surveys by question
        Map<QuestionBank, List<Survey>> surveysByQuestion = surveys.stream().collect(Collectors.groupingBy(Survey::getQuestionBank));

        // select the first survey for each question
        List<Survey> surveys2 = surveysByQuestion.values().stream().map(surveyList -> surveyList.get(0)).collect(Collectors.toList());




        return surveys2;

    }


    //getPublishedButNotAdminPublishedSurveys
    public List<Survey> getPublishedButNotAdminPublishedSurveysDistinct(){

        List<Survey> survey =  surveyRepository.findByInstructorPublishedAdminPublishedDistinct(true,false);

        // group the surveys by question
        Map<String, List<Survey>> surveysByQuestion = survey.stream().collect(Collectors.groupingBy(Survey::getSurveyName));

        // select the first survey for each question
        List<Survey> surveys2 = surveysByQuestion.values().stream().map(surveyList -> surveyList.get(0)).collect(Collectors.toList());

        return surveys2;

    }

    public List<Survey> getPublishedAndAdminPublishedSurveys(String userId){

        List<Survey> surveys = surveyRepository.findByStudentIdInstructorPublishedAdminPublished(userId,true,true);
        Map<String, List<Survey>> surveysByQuestion = surveys.stream().collect(Collectors.groupingBy(Survey::getSurveyName));
        List<Survey> surveys2 = surveysByQuestion.values().stream().map(surveyList -> surveyList.get(0)).collect(Collectors.toList());

        return surveys2;
    }

    //getPublishedStudentSurveys
    public List<Survey> getPublishedStudentSurveys(String studentId, String surveyName){
        return surveyRepository.findByStudentIdInstructorPublishedandSurveyname(studentId,true ,surveyName);
    }

    //getDistinctSurveyNamesNotPublished
    public List<String> getDistinctSurveyNamesNotPublished(String instructorId){

        return surveyRepository.getDistinctSurveyNamesByInstructorIdInstructorPublished(instructorId,false);
    }

    //publishStudentSubmit
    @Transactional
    public void publishStudentSubmit(String studentId,String surveyName){



        List<Survey> survey = surveyRepository.findByStudentIdAndSurveyName(studentId,surveyName);

        for (Survey s : survey){

            if (s.getAnswer() == null){
                throw new IllegalStateException("Survey not answered");
            }
        }


        for (Survey s : survey){

            if (s.getAnswer() == null){
                throw new IllegalStateException("Survey not answered");
            }

            Long id = s.getId();
            surveyRepository.setStudentPublished(id);
        }
    }


    //getAnswerForASpecificSurvey
    public String getAnswerForASpecificSurvey(String studentId, String surveyName, String questionBank){
        String answer = surveyRepository.getAnswerForASpecificSurvey(studentId, surveyName, questionBank);

        if (answer == null){
            return ("Survey not answered");
        }

        return answer;
    }

    //getAllSurveysAdminAndInstructorPublishedTrue
    public List<Survey> getAllSurveysAdminAndInstructorPublishedTrue() {

        List<Survey> surveys = surveyRepository.findByInstructorPublishedAdminPublished( true, true);

        // group the surveys by survey name
        Map<String, List<Survey>> surveysByQuestion = surveys.stream().collect(Collectors.groupingBy(Survey::getSurveyName));

        // select the first survey for each question
        List<Survey> surveys2 = surveysByQuestion.values().stream().map(surveyList -> surveyList.get(0)).collect(Collectors.toList());

        return surveys2;

    }

    //getAllSurveysBySurveyNameAndInstructorId
    public List<Survey> getAllSurveysBySurveyNameAndInstructorId(String surveyName, String instructorId) {

        return surveyRepository.findBySurveyNameInstructorId(surveyName, instructorId);
    }


}
