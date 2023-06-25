import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MySurveys = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [surveys, setSurveys] = useState([]);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            navigate('/login');
        } else {
            handleList();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    const handleBack = () => {
        navigate('/mypage');
    };

    const handleList = async () => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            const response = await fetch(
                `http://localhost:8080/api/v1/survey/get_distinct_survey_names_by_student_id?userId=${loggedInUser.userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                setSurveys(data);
                setError('');
            } else {
                setError('An error occurred while fetching the surveys list');
            }
        } catch (error) {
            setError('An error occurred while fetching the surveys list');
        }
    };

    const handleSurveyClick = async (surveyName) => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            const response = await fetch(
                `http://localhost:8080/api/v1/survey/get_surveys_by_survey_name_and_student_id?surveyName=${surveyName}&userId=${loggedInUser.userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('selectedSurvey', JSON.stringify(data)); // Seçilen anketi localStorage'e kaydetme
                navigate('/mypage/student/surveysolution'); // Yönlendirme işlemi
            } else {
                setError('An error occurred while fetching the survey data');
            }
        } catch (error) {
            setError('An error occurred while fetching the survey data');
        }
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleBack}>Back</button>
            <h2>Survey List</h2>
            {surveys.length > 0 ? (
                <ul>
                    {surveys.map((survey) => (
                        <li key={survey}>
                            <button onClick={() => handleSurveyClick(survey)}>
                                {survey}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No survey to display</p>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default MySurveys;
