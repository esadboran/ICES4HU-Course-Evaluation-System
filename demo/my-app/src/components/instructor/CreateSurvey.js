import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [courseCode, setCourseCode] = useState('');
    const [instructor, setInstructor] = useState(null);
    const [surveyName, setSurveyName] = useState("");
    const [questionBank, setQuestionBank] = useState("");
    const [surveys, setSurveys] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [courses, setCourses] = useState([]);
    const [isFirstFormSaved, setIsFirstFormSaved] = useState(false);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const savedSurvey = JSON.parse(localStorage.getItem('savedSurvey'));
        if (!loggedInUser) {
            navigate('/login');
        } else {
            console.log("giriyor")
            setInstructor(loggedInUser);
            // Trigger the handleGetSemester function when the component mounts
        }
    }, [navigate]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/listcourses/user?userId=${loggedInUser.userId}`)
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses', error));
    }, []);


    const handleCreateSurvey = async (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için form gönderimini engeller

        try {

            const surveyData = {
                surveyName,
                instructorId :instructor.userId,
                courseCode: selectedCourse,
            };

            console.log(surveyData)

            const response = await fetch('http://localhost:8080/api/v1/survey/publish_survey', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });
            console.log(2)
            if (response.ok) {
                setError('');
                navigate("/mypage");
            } else {
                setError('Failed to add survey');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding course');
        }
    };

    const handleSaveSurvey = async (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için form gönderimini engeller

        try {

            const surveyData = {
                surveyName,
                instructorId :instructor.userId,
                courseCode: selectedCourse,
                questionBank
            };

            console.log(surveyData)

            const response = await fetch('http://localhost:8080/api/v1/survey/add_survey', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });
            console.log(2)
            if (response.ok) {
                setSurveys([...surveys, surveyData]); // Yeni kursu kurs listesine ekler
                setSurveyName(surveyName)
                setCourseCode(courseCode);
                setQuestionBank("")
                setInstructor(instructor)
                setError('');
                navigate("/mypage/instructor/createsurvey");
            } else {
                setError('Failed to add survey');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding course');
        }
    };

    const handleDeleteSurvey = async (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için form gönderimini engeller

        try {

            const surveyData = {
                surveyName,
                instructorId :instructor.userId,
                courseCode: selectedCourse,
            };

            console.log(surveyData)

            const response = await fetch('http://localhost:8080/api/v1/survey/delete_surveys_on_cancel', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });
            console.log(2)
            if (response.ok) {
                setError('');
                navigate("/mypage");
            } else {
                setError('Failed to add survey');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding course');
        }
    };

    const handleDeleteQuestion = async (survey) => {
        try {
            const surveyData = {
                surveyName: survey.surveyName,
                instructorId: instructor.userId,
                courseCode: selectedCourse,
                questionBank: survey.questionBank,
            };

            const response = await fetch('http://localhost:8080/api/v1/survey/delete_specific_survey', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(surveyData),
            });

            if (response.ok) {
                setError('');
                // Remove the deleted question from the surveys state
                const updatedSurveys = surveys.filter((s) => s.questionBank !== survey.questionBank);
                setSurveys(updatedSurveys);
                navigate('/mypage/instructor/createsurvey');
            } else {
                setError('Failed to delete the question');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while deleting the question');
        }
    };

    const handleFinishButtonClick = () => {
        alert("Survey Saved")
        navigate('/mypage');
    };

    const handleCourseSelect = event => {
        setSelectedCourse(event.target.value);
    };

    const handleSurveyName = event => {
        setSurveyName(event.target.value);
    };

    const handleQuestionBank = event => {
        setQuestionBank(event.target.value);
    };
    const handleDownloadDocuments = () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/downloaddocuments");
    };
    const handleView = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/viewprofile');
    };

    const handleAssignStudents = () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/assignstudent");
    };
    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };
    const handleCancel = () => {
        navigate('/mypage');
    };


    const handleFirstFormSubmit = (e) => {
        e.preventDefault();
        // Save the first form
        // Perform validation and save the data
        setIsFirstFormSaved(true);
    };


    return (
        <>
            <nav style={{backgroundColor: 'darkkhaki', height: '50px'}}>
                <div style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: 'center',
                    height: '100%',
                    padding: '0 1rem'
                }}>
                    <h2 style={{fontSize: '2rem'}}>ICES4HU</h2>
                    <button onClick={handleLogout} className={"link-btn-mypage"}>LOG OUT</button>
                </div>
            </nav>
            <p></p>


            <img src="/images/logo.png" alt="Icon" style={{width: '15%', Height: '%15', float: "right"}}/>
            <img src="/images/name.png" alt="Icon" style={{width: '15%', Height: '%15', float: "right"}}/>

            <div className={"dashboard-admin"} style={{height: 1500}}>

            </div>
            <div className={"profile-container"}>
                <div>
                    <p style={{fontSize: '1.5rem'}}>Profile</p>
                    <img src="/images/profile.jpg" alt="Icon" style={{width: '60%', maxHeight: '60%'}}/>
                    <p></p>
                    <button onClick={handleView}>View Profile</button>
                </div>
            </div>
            <div className={"first-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>Assign Students</p>
                    <button onClick={handleAssignStudents}>Assign Students</button>
                </div>
            </div>
            <div className={"second-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>Create Electronic Survey</p>
                    <button>Create Electronic Survey</button>
                </div>
            </div>
            <div className={"thirth-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>Download Shared Documents
                    </p>
                    <button onClick={handleDownloadDocuments}>Documents</button>
                </div>
            </div>

            <div className="menu_objects"
                 style={{
                     position: "absolute",
                     top: 350,
                     left: 700,
                     backgroundColor: "lightgoldenrodyellow",
                     height: 1200
                 }}>
                <h1 style={{fontSize: "50px"}}>Create Survey</h1>
                <div className={"form-container"}
                     style={{position: "absolute", top: 200, left: 40, height: 950, width: 1100}}>
                    <div>
                        <h2>Add Question for Survey: {surveyName} for course {selectedCourse}</h2>
                        {!isFirstFormSaved ? (
                            <form onSubmit={handleFirstFormSubmit}>
                                <label>Survey Name:</label>
                                <input type="text" value={surveyName} onChange={handleSurveyName} required/>
                                <div>
                                    <label htmlFor="courseCode">Select a Course Code:</label>
                                    <p></p>
                                    {courses.length > 0 ? (
                                        <select id="courseCode" value={selectedCourse} onChange={handleCourseSelect}>
                                            <option value="">-- Select Course --</option>
                                            {courses.map((course) => (
                                                <option key={course.courseCode} value={course.courseCode}>
                                                    {course.id} - {course.courseCode} - {course.courseName}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p>No courses available.</p>
                                    )}
                                </div>
                                <button type="submit" style={{backgroundColor: "seagreen"}}>Save</button>
                            </form>
                        ) : (
                            <form onSubmit={handleSaveSurvey}>
                                <label>Add New Question:</label>
                                <input type="text" value={questionBank} onChange={handleQuestionBank} required/>
                                {error && <p>{error}</p>}
                                <button type="submit">Add Question</button>
                            </form>
                        )}

                        <h3>Added Questions:</h3>
                        {surveys.map((survey, index) => (
                            <div key={index}>
                                <p>Added Question : {survey.questionBank}</p>
                                <button type="submit" onClick={() => handleDeleteQuestion(survey)}>Delete Question
                                </button>
                                <hr/>
                            </div>
                        ))}
                        <button onClick={handleFinishButtonClick} style={{backgroundColor: "darkgreen"}}>Save the new
                            survey
                        </button>
                        <p></p>
                        <button onClick={handleCreateSurvey} style={{backgroundColor: "darkblue"}}>Publish the new
                            survey
                        </button>
                        <p></p>
                        <button onClick={handleDeleteSurvey} style={{backgroundColor: "darkgray"}}>Delete the new
                            survey
                        </button>
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </div>

        </>
    );
};

export default CreateSurvey;