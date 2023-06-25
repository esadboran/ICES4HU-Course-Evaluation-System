import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditSurvey = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [instructor, setInstructor] = useState(null);
    const [surveys, setSurveys] = useState([]);
    const [question, setQuestion] = useState('');
    const [sn, setSn] = useState("");
    const [cc, setCc] = useState("");
    const [data, setData] = useState([]);
    const savedSurvey = JSON.parse(localStorage.getItem('savedSurvey'));
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const savedSurvey = JSON.parse(localStorage.getItem('savedSurvey'));
        if (!loggedInUser) {
            navigate('/login');
        } else {
            setInstructor(loggedInUser);
            // Fetch the survey details if savedSurvey exists
            if (savedSurvey) {
                fetchSurveyDetails(savedSurvey, loggedInUser.userId);
            }
        }
    }, [navigate]);


    const fetchSurveyDetails = async (savedSurvey, userId) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/survey/get_saved_but_not_published_surveys?surveyName=${savedSurvey}&userId=${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Error fetching survey details');
            }
            const data = await response.json();
            console.log('Data:', data);

            // Pre-fill the form fields with the retrieved survey details
            if (Array.isArray(data) && data.length > 0) {
                const survey = data[0];
                setSn(data[0].surveyName);
                setCc(data[0].course.courseCode);
                setSurveys(survey?.questions || []);
            }
            setData(data);
        } catch (error) {
            console.log(savedSurvey);
            console.log(userId);
            console.error('Error fetching survey details', error);
        }
    };

    const handleSaveSurvey = async (e) => {
        e.preventDefault();

        try {
            const surveyData = {
                surveyName: sn,
                courseCode: cc,
                instructorId: instructor.userId,
                questionBank: question,
            };

            const response = await fetch('http://localhost:8080/api/v1/survey/add_survey', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });

            if (response.ok) {
                setSurveys([...surveys, question]);
                setQuestion('');
                setError('');
                fetchSurveyDetails(savedSurvey, loggedInUser.userId);
            } else {
                setError('Failed to add question');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding question');
        }
    };

    const handleDeleteQuestion = async (question) => {
        try {
            const surveyData = {
                surveyName: sn,
                courseCode: cc,
                instructorId: instructor.userId,
                questionBank: question,
            };

            const response = await fetch('http://localhost:8080/api/v1/survey/delete_specific_survey', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });

            if (response.ok) {
                setSurveys(surveys.filter((q) => q !== question));
                setError('');
                fetchSurveyDetails(savedSurvey, loggedInUser.userId);
            } else {
                setError('Failed to delete question');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while deleting question');
        }
    };

    const handlePublishSurvey = async () => {
        try {
            const surveyData = {
                surveyName: sn,
                courseCode: cc,
                instructorId: instructor.userId,
            };

            const response = await fetch('http://localhost:8080/api/v1/survey/publish_survey', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });

            if (response.ok) {
                navigate('/mypage');
            } else {
                setError('Failed to publish survey');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while publishing survey');
        }
    };

    const handleDeleteSurvey = async () => {
        try {
            const surveyData = {
                surveyName: sn,
                courseCode: cc,
                instructorId: instructor.userId,
            };

            const response = await fetch('http://localhost:8080/api/v1/survey/delete_survey', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });

            if (response.ok) {
                navigate('/dashboard');
            } else {
                setError('Failed to delete survey');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while deleting survey');
        }
    };

    const handleFinishButtonClick = () => {
        alert("Survey Saved")
        navigate('/mypage');
    };

    return (
        <div>
            <h2>Edit Survey Called {savedSurvey} for {cc}</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSaveSurvey}>
                <div>
                    <label htmlFor="addQuestion">Add Question</label>
                    <input
                        type="text"
                        id="addQuestion"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                    />
                    <button type="submit">Add</button>
                </div>
            </form>
            {data.length > 0 && (
                <div>
                    <h3>Saved Surveys:</h3>
                    <ul>
                        {data.map((survey) => (
                            <li key={survey.id}>
                                {survey.questionBank.question}
                                <p></p>
                                <button onClick={() => handleDeleteQuestion(survey.questionBank.question)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <button onClick={handleFinishButtonClick}>Save Survey</button>
                <button onClick={handlePublishSurvey}>Publish Survey</button>
                <button onClick={handleDeleteSurvey}>Delete Survey</button>
            </div>
        </div>
    );
};

export default EditSurvey;
