import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const SurveySolution = () => {
    const selectedSurvey = JSON.parse(localStorage.getItem('selectedSurvey'));
    const [loggedInUser, setLoggedInUser] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState({}); // Error state'i
    const [responses, setResponses] = useState({}); // Cevaplar için state objesi
    const [savedIndices, setSavedIndices] = useState([]);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            navigate('/login');
        } else {
            setLoggedInUser(loggedInUser)
        }
    }, [navigate]);

    const handleSaveSurvey = () => {
        navigate('/mypage/student/mysurveys');
    };
    const handleSavePublished = async () => {

        const request = {
            surveyName: selectedSurvey[0].surveyName,
            studentId: loggedInUser.userId
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/survey/publish_student_submit', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (response.ok) {
                alert("Survey Published successfully")
                navigate('/mypage/student/mysurveys');
            } else {
                alert('Please answer the all questions!!');
                navigate("/mypage/student/surveysolution");
            }
        } catch (error) {
            console.log('Please answer the all questions:', error);
        }

    };


    const handleSave = async (questionId, value) => {
        const selectedQuestion = selectedSurvey[questionId];
        const request = {
            surveyName: selectedQuestion.surveyName,
            instructorId: selectedQuestion.instructor.userId,
            courseCode: selectedQuestion.course.courseCode,
            studentId: selectedQuestion.student.userId,
            questionBank: selectedQuestion.questionBank.question,
            answer: value
        };

        console.log(request)

        try {
            const response = await fetch('http://localhost:8080/api/v1/survey/answer_survey', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (response.ok) {
                console.log('Answer saved successfully!');
                setSavedIndices(prevSavedIndices => [...prevSavedIndices, questionId]);
            } else {
                alert('Please answer the all questions!');
            }
        } catch (error) {
            console.log('An error occurred:', error);
        }
    };

    const handleOptionChange = (questionId, value) => {
        setResponses(prevResponses => ({
            ...prevResponses,
            [questionId]: value
        }));
    };

    return (
        <div>
            <h2>Survey Solution</h2>
            <h3>Survey Name: {selectedSurvey[0].surveyName}</h3>

            {selectedSurvey.map((survey, index) => (
                <div key={survey.id}>
                    <h4>Question: {survey.questionBank.question}</h4>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name={`question_${survey.id}`}
                                value="1"
                                onChange={() => handleOptionChange(index, '1')}
                            />
                            1
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`question_${survey.id}`}
                                value="2"
                                onChange={() => handleOptionChange(index, '2')}
                            />
                            2
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`question_${survey.id}`}
                                value="3"
                                onChange={() => handleOptionChange(index, '3')}
                            />
                            3
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`question_${survey.id}`}
                                value="4"
                                onChange={() => handleOptionChange(index, '4')}
                            />
                            4
                        </label>
                        <label>
                            <input
                                type="radio"
                                name={`question_${survey.id}`}
                                value="5"
                                onChange={() => handleOptionChange(index, '5')}
                            />
                            5
                        </label>
                        <button onClick={() => handleSave(index, responses[index])}>
                            Save
                        </button>
                        {savedIndices.includes(index) && <span style={{ marginLeft: '10px' }}>Saved</span>}
                    </div>
                </div>
            ))}
            <br/>
            <br/>
            <br/>
            <button onClick={() => handleSaveSurvey()}> Save the Answers </button>
            <br/>
            <br/>
            <br/>
            <button onClick={() => handleSavePublished()}> Published the Survey Results</button>
        </div>
    );
};

export default SurveySolution;
