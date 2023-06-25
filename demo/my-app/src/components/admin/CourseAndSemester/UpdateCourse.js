import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UpdateCourse = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [semester, setSemester] = useState(null);
    const [courseCode, setCourseCode] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseCredit, setCourseCredit] = useState('');
    const [courseType, setCourseType] = useState('');
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            navigate('/login');
        } else {
            if (loggedInUser && loggedInUser.appUserRole !== 'ADMIN') {
                alert("You're not authorized for this page!");
                navigate('/mypage/viewprofile');
            }
        }
    }, [navigate]);

    useEffect(() => {
        // Retrieve managed user from local storage
        const managedSemester = JSON.parse(localStorage.getItem('managedSemester'));
        setSemester(managedSemester);
        console.log(managedSemester);
    }, []);

    const handleAddCourse = async (e) => {
        e.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için form gönderimini engeller

        try {
            const courseData = {
                courseCode,
                courseName,
                courseCredit,
                courseType: courseType.toUpperCase(),
                semesterName: semester.semesterName,
            };

            const response = await fetch('http://localhost:8080/api/v1/add_course', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });

            if (response.ok) {
                setCourses([...courses, courseData]); // Yeni kursu kurs listesine ekler
                setCourseCode('');
                setCourseName('');
                setCourseCredit('');
                setCourseType('');
                setError('');
                navigate("/mypage/admin/updatecourse");
            } else {
                setError('Failed to add course');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding course');
        }
    };

    const handleFinishButtonClick = () => {
        navigate('/mypage/admin/listsemester');
    };

    const handleDefineSemester= () => {
        navigate("/mypage/admin/listsemester");
    };
    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };
    const handleEnableUsers = () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/admin/enablestudent");
    };

    const handleView = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/viewprofile');
    };
    const handleAddInstructor = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/admin/addinstructors');
    };
    const handleListUsers = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/admin/listusers');
    };

    const handleCancel = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/');
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
                    <p style={{fontSize: '1.2rem'}}>Add Instructors</p>
                    <button onClick={handleAddInstructor}>Add Instructors</button>
                </div>
            </div>
            <div className={"second-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>List Users</p>
                    <button onClick={handleListUsers}>List Users </button>
                </div>
            </div>
            <div className={"thirth-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>Semester Settings</p>
                    <button onClick={handleDefineSemester}>Semester Settings </button>
                </div>
            </div>
            <div className={"fourth-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>Enable Users</p>
                    <button onClick={handleEnableUsers}>Enable Users </button>
                </div>
            </div>
            <div className="menu_objects"
                 style={{
                     position: "absolute",
                     top: 350,
                     left: 700,
                     backgroundColor: "lightgoldenrodyellow",
                     justifyContent: "center",
                     height:860
                 }}>
                <img src="/images/logo.png" alt="Resim"/>
                <h1>ICES4HU</h1>
                <h2 className="form-title">Add Course</h2>
                <div className={"semester"} style={{position: "absolute", top: 350, left: 5,height:360}}>
                    <div>
                        {semester && (
                            <div>
                                <h2>Add Course for Semester: {semester.semesterName}</h2>
                                <form onSubmit={handleAddCourse}>
                                    <label>Course Code:</label>
                                    <input type="number" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} required />
                                    <label>Course Name:</label>
                                    <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
                                    <label>Course Credit:</label>
                                    <input type="number" value={courseCredit} onChange={(e) => setCourseCredit(e.target.value)} required />
                                    <label>Course Type:</label>
                                    <select value={courseType} onChange={(e) => setCourseType(e.target.value)} required>
                                        <option value="">Select Course Type</option>
                                        <option value="REQUIRED">REQUIRED</option>
                                        <option value="ELECTIVE">ELECTIVE</option>
                                    </select>
                                    {error && <p>{error}</p>}
                                    <p></p>
                                    <button type="submit" style={{borderRadius:"5px"}}>Add Course</button>
                                </form>

                                <h3>Added Courses:</h3>
                                {courses.map((course, index) => (
                                    <div key={index}>
                                        <p>Course Code: {course.courseCode}</p>
                                        <p>Course Name: {course.courseName}</p>
                                        <p>Course Credit: {course.courseCredit}</p>
                                        <p>Course Type: {course.courseType}</p>
                                        <hr />
                                    </div>
                                ))}

                                <button onClick={handleFinishButtonClick} style={{backgroundColor:"darkred",borderRadius:"5px"}}>Finish Update</button>
                            </div>
                        )}
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </div>
        </>

    );
};

export default UpdateCourse;