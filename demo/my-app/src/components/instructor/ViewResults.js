import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewResults = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [instructor, setInstructor] = useState(null);
    const [sn, setSn] = useState('');
    const [cc, setCc] = useState('');
    const [groupedData, setGroupedData] = useState([]);
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
                `http://localhost:8080/api/v1/survey/get_all_surveys_by_survey_name_and_instructor_id?surveyName=${savedSurvey.surveyName}&userId=${userId}`,
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
                setSn(survey.surveyName);
                setCc(survey.course.courseCode);
                const groupedData = groupDataByQuestion(data);
                setGroupedData(groupedData);
            }
        } catch (error) {
            console.error('Error fetching survey details', error);
        }
    };

    const groupDataByQuestion = (data) => {
        const groupedData = data.reduce((groups, item) => {
            const question = item.questionBank.question;
            if (!groups[question]) {
                groups[question] = [];
            }
            groups[question].push(item);
            return groups;
        }, {});
        return groupedData;
    };

    const countAnswers = (group, value) => {
        const count = group.reduce((acc, item) => {
            if (item.answer === value) {
                return acc + 1;
            }
            return acc;
        }, 0);
        return count;
    };

    return (
        <div>
            <h2>Edit Survey Called {sn} for {cc}</h2>
            {error && <p>{error}</p>}
            {Object.keys(groupedData).length > 0 && (
                <div>
                    <h3>Saved Surveys:</h3>
                    {Object.entries(groupedData).map(([question, group]) => (
                        <div key={question}>
                            <h4>For questionBank.question: {question}</h4>
                            <ul>
                                <li>
                                    There is {countAnswers(group, '1')} person(s) who answered 1.
                                </li>
                                <li>
                                    There is {countAnswers(group, '2')} person(s) who answered 2.
                                </li>
                                <li>
                                    There is {countAnswers(group, '3')} person(s) who answered 3.
                                </li>
                                <li>
                                    There is {countAnswers(group, '4')} person(s) who answered 4.
                                </li>
                                <li>
                                    There is {countAnswers(group, '5')} person(s) who answered 5.
                                </li>
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewResults;
