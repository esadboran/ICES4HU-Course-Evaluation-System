import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const AcceptSurveys = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [publishedSurveys, setPublishedSurveys] = useState([]);

    useEffect(() => {
        if (loggedInUser) {
            console.log('Refresh attım');
        }
        fetchPublishedSurveys();
    }, []);

    const fetchPublishedSurveys = async () => {
        let sharedWith2 = '';
        try {
            const response = await fetch(
                `http://localhost:8080/api/v1/survey/get_published_but_not_admin_published_surveys`,
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
            setPublishedSurveys(data);
        } catch (error) {
            console.error('Error fetching shared documents', error);
        }
    };

    const handleSurveyClick = (survey) => {
        // Call the backend endpoint to publish the survey
        const requestBody = {
            surveyName: survey.surveyName,
            instructorId: survey.instructor.userId,
            courseCode: survey.course.courseCode,
        };

        console.log(requestBody);

        fetch('http://localhost:8080/api/v1/survey/publish_survey_admin', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => {
                if (response.ok) {
                    fetchPublishedSurveys();
                    console.log('Survey published successfully');
                    // Perform any additional actions after publishing the survey
                } else {
                    throw new Error('Failed to publish survey');
                }
            })
            .catch((error) => {
                console.error('Error publishing survey', error);
            });

        // Perform any other actions
        console.log(`Survey "${survey.surveyName}" saved in local storage.`);
        navigate('/mypage/admin/acceptsurveys');
    };

    return (
        <div>
            <h2>Saved Surveys:</h2>
            {publishedSurveys.length > 0 ? (
                <ul>
                    {publishedSurveys.map((survey) => (
                        <li key={survey.id}>
                            <div>
                                <button onClick={() => handleSurveyClick(survey)}>Publish</button>
                                <span>{survey.surveyName}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No published surveys available.</p>
            )}
        </div>
    );
};

export default AcceptSurveys;
