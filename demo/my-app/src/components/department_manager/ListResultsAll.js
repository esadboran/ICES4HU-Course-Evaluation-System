import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ListResultsAll = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const savedSurvey = JSON.parse(localStorage.getItem('savedSurvey'));
    const [savedSurveys, setSavedSurveys] = useState([]);

    useEffect(() => {
        if (loggedInUser) {
            console.log('Refresh attım');
        }
        fetchSavedSurveys();
    }, []);

    const fetchSavedSurveys = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/v1/survey/get_all_surveys_admin_and_instructor_published_true",
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Error fetching shared documents');
            }
            const data = await response.json();
            console.log(data);
            setSavedSurveys(data);
        } catch (error) {
            console.error('Error fetching shared documents', error);
        }
    };

    const handleSurveyClick = (survey) => {
        localStorage.setItem('savedSurvey', JSON.stringify(survey));
        // You can perform any additional actions here
        console.log(`Survey "${survey}" saved in local storage.`);
        navigate("/mypage/depman/viewresultsall");
    };

    return (
        <div>
            <h2>Saved Surveys:</h2>
            {savedSurveys.length > 0 ? (
                <ul>
                    {savedSurveys.map((survey) => (
                        <li key={survey}>
                            <button onClick={() => handleSurveyClick(survey)}>{survey.surveyName}</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No saved surveys available.</p>
            )}
        </div>
    );
};

export default ListResultsAll;
