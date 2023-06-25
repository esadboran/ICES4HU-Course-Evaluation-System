import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const AssignInstructors = () => {
    const [courses, setCourses] = useState([]);
    const [instructors, setInstructors] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser && loggedInUser.appUserRole !== 'DEPARTMENT_MANAGER') {
            alert("You're not authorized for this page!");
            navigate('/mypage/viewprofile');
        }


        fetch('http://localhost:8080/api/v1/listcourses/all')
            .then(response => response.json())
            .then(data => setCourses(data))
            .catch(error => console.error('Error fetching courses', error));

        fetch('http://localhost:8080/api/v1/list/instructors')
            .then(response => response.json())
            .then(data => setInstructors(data))
            .catch(error => console.error('Error fetching instructors', error));
    }, []);

    const handleCourseSelect = event => {
        setSelectedCourse(event.target.value);
    };

    const handleInstructorSelect = event => {
        setSelectedInstructor(event.target.value);
    };
    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };
    const handleCancel = () => {
        navigate('/mypage');
    };
    const handleView = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/viewprofile');
    };
    const handleAssignInstructors = () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/depman/assigninstructor");
    };
    const handleShareDocuments = () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/depman/uploaddocument");
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const request = {
            instructorId: selectedInstructor,
            courseCode: selectedCourse

        };
        console.log(selectedInstructor);
        console.log(selectedCourse);
        try {
            const response = await fetch('http://localhost:8080/api/v1/assign_instructor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (response.ok) {
                alert("Instructor assigned successfully")
                // Add any additional logic for success handling
            } else {
                alert('Teacher assigned to the course previous');
                navigate("/mypage/viewprofile")
                // Add any additional logic for error handling
            }
        } catch (error) {
            console.error('Error assigning instructor', error);
            // Add any additional error handling logic
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
                    <p style={{fontSize: '1.2rem'}}>Share Documents</p>
                    <button onClick={handleShareDocuments}>Share Documents</button>
                </div>
            </div>
            <div className={"second-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>View Shared Documents</p>
                    <button>View Shared Documents</button>
                </div>
            </div>
            <div className={"thirth-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>Assign Instructors to Courses
                    </p>
                    <button onClick={handleAssignInstructors}>Assign</button>
                </div>
            </div>
            <div className={"fourth-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>See Evaluation Results</p>
                    <button>See Evaluation Results</button>
                </div>
            </div>
            <div className="documents-container" style={{position: "absolute", top: 350, left: 700}}>
                <h1 style={{fontSize: "40px"}}>Assign Instructors</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="course" className="documents-container" style={{fontSize: "25px", height:"15px",width:"500px",borderRadius: "5px"}}>Select a Course:</label>
                            {courses.length > 0 ? (
                                <select id="course" value={selectedCourse} onChange={handleCourseSelect}>
                                    <option value="">-- Select Course --</option>
                                    {courses.map(course => (
                                        <option  style={{fontSize: "25px"}}key={course.courseCode} value={course.courseCode}>
                                            {course.courseCode} - {course.courseName}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>No courses available.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="instructor" className="documents-container" style={{fontSize: "25px", height:"15px",width:"500px",borderRadius: "5px"}}>Select an Instructor:</label>
                            <p></p>
                            {instructors.length > 0 ? (
                                <select style={{fontSize: "20px"}} id="instructor" value={selectedInstructor} onChange={handleInstructorSelect}>
                                    <option value="" >-- Select Instructor --</option>
                                    {instructors.map(instructor => (
                                        <option  key={instructor.userId} value={instructor.userId}>
                                            {instructor.userId} - {instructor.name}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p>No instructors available.</p>
                            )}
                        </div>
                        <p></p>
                        <button type="submit">Assign Instructor</button>
                        <p></p>
                    </form>
                </div>
                <button onClick={handleCancel} style={{backgroundColor:"darkred"}}>Cancel</button>

            </div>


        </>
    );
};

export default AssignInstructors;