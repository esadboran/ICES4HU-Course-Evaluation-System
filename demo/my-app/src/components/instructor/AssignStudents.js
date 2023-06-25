import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
const AssignStudents = () => {
    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser && loggedInUser.appUserRole !== 'INSTRUCTOR') {
            alert("You're not authorized for this page!");
            navigate('/mypage');
        }

        fetch('http://localhost:8080/api/v1/listcourses/all')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses', error));

        fetch('http://localhost:8080/api/v1/list/students')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching students', error));
    }, []);

    const handleCourseSelect = event => {
        setSelectedCourse(event.target.value);
    };

    const handleStudentSelect = event => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedStudents(selectedOptions);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const request = {
            courseCode: selectedCourse,
            studentId: selectedStudents[0]

        };
        console.log(request)

        try {
            const response = await fetch('http://localhost:8080/api/v1/assign_student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
            console.log("response",response)
            if (response.ok) {
                alert('Students assigned successfully');
                console.log('Students assigned successfully');
                // Add any additional logic for success handling
            } else {
                alert('This student is assigned to the course previous!');
                // Add any additional logic for error handling
            }
        } catch (error) {
            alert('Error assigning students  when fetching');
            console.error('Error assigning students', error);
            // Add any additional error handling logic
        }
    };
    const handleCreateSurvey= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/createsurvey");
    };

    const handleDownloadDocuments= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/downloaddocuments");
    };
    const handleView = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/viewprofile');
    };

    const handleAssignStudents= () => {
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

            <div className={"dashboard-admin"}>

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
                    <button onClick={handleCreateSurvey}>Create Electronic Survey</button>
                </div>
            </div>
            <div className={"thirth-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>Download Shared Documents
                    </p>
                    <button onClick={handleDownloadDocuments}>Documents </button>
                </div>
            </div>

            <div className="menu_objects" style={{ position: "absolute", top: 350, left: 700 , backgroundColor:"lightgoldenrodyellow"}}>
                <h1 style={{fontSize:"50px"}}>Assign Students Page</h1>
                <div className={"form-container"} style={{position: "absolute", top: 200, left: 370}} >
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="course" style={{fontSize:"30px"}}>Select a Course:</label>
                                {courses.length > 0 ? (
                                    <select id="course" value={selectedCourse} onChange={handleCourseSelect}>
                                        <option value="">-- Select Course --</option>
                                        {courses.map(course => (
                                            <option key={course.courseCode} value={course.courseCode}>
                                                {course.courseCode} - {course.courseName}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p style={{fontSize:"20px"}}>No courses available.</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="students" style={{fontSize:"20px"}}>Select Students:</label>
                                {students.length > 0 ? (
                                    <select id="students" value={selectedStudents} onChange={handleStudentSelect}>
                                        <option value="">-- Select Students --</option>
                                        {students.map(student => (
                                            <option key={student.userId} value={student.userId}>
                                                {student.userId} - {student.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <p>No students available.</p>
                                )}
                            </div>
                            <p></p>
                            <button type="submit" style={{backgroundColor:"darkgreen"}}>Assign Students</button>
                            <p></p>
                            <button onClick={handleCancel} style={{backgroundColor:"darkred"}}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssignStudents;