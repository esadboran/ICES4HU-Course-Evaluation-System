import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const MyCourses = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            navigate('/login');
        } else {
            handleList(); // Trigger the handleList function when the component mounts
        }
    }, [navigate]);

    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    const handleBack = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage');
    };

    const handleList = async () => {
        try {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
            const response = await fetch(`http://localhost:8080/api/v1/listcourses/user?userId=${loggedInUser.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCourses(data); // Update the courses state with the received data
                setError('');
            } else {
                setError('An error occurred while fetching the course list');
            }
        } catch (error) {
            setError('An error occurred while fetching the course list');
        }
    };

    const [expandedCourseId, setExpandedCourseId] = useState(null);

    const handleCourseClick = (courseId) => {
        if (expandedCourseId === courseId) {
            // If the clicked course is already expanded, collapse it
            setExpandedCourseId(null);
        } else {
            // Otherwise, expand the clicked course
            setExpandedCourseId(courseId);
        }
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
            <div className={"dashboard"} style={{height:1300}}>
            </div>
            <div className={"profile-container"}>
                <div>
                    <p style={{fontSize: '1.5rem'}}>Profile</p>
                    <img src="/images/profile.jpg" alt="Icon" style={{width: '60%', maxHeight: '60%'}}/>
                    <p></p>
                    <button>View Profile</button>
                </div>
            </div>
            <div className={"courses-container"}>
                <div>
                    <p style={{fontSize: '1.5rem'}}>Course Schedule</p>
                    <button >Course Schedule</button>
                </div>
            </div>
            <div className={"evaluation-container"}>
                <div>
                    <p style={{fontSize: '1.5rem'}}>Evaluation Forms</p>
                    <button>Evaluation Forms</button>
                </div>
            </div>

            <div className="menu_objects"
                 style={{position: "absolute", top: 350, left: 700, backgroundColor: "lightgoldenrodyellow", height:1000}}>
                <div>

                    <h2>Course List</h2>
                    {courses.length > 0 ? (
                        <ul>
                            {courses.map((course) => (
                                <li key={course.id}>
                                    <button onClick={() => handleCourseClick(course.id)}>
                                        {course.courseName}
                                    </button>
                                    {expandedCourseId === course.id && (
                                        <p>
                                            <strong>Course Code:</strong> {course.courseCode}
                                            <br/>
                                            <strong>Course Credit:</strong> {course.courseCredit}
                                            <br/>
                                            <strong>Course Type:</strong> {course.courseType}
                                        </p>
                                    )}
                                    <p></p>
                                </li>

                            ))}
                        </ul>
                    ) : (
                        <p>No courses to display</p>
                    )}
                    {error && <p>{error}</p>}
                </div>
                <button onClick={handleBack} style={{backgroundColor:"darkred"}}>Back</button>
            </div>



        </>
    );
};

export default MyCourses;