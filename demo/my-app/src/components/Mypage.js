import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/Mypage.css';



const MyPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
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
    const handleDefineSemester = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/admin/listsemester');
    };

    const handleEnableUsers = () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/admin/enablestudent");
    };
    const handleCourseList= () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/student/mycourses');
    };

    const handleShareDocuments= () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/depman/uploaddocument');
    };

    const handleCreateSurvey= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/createsurvey");
    };

    const handleDownloadDocuments= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/downloaddocuments");
    };

    const handleAssignStudents= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/assignstudent");
    };
    const handleAssignInstructors= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/depman/assigninstructor");
    };

    const handleAllResults= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/depman/listresultsall");
    };

    const handleSurveysList = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/student/mysurveys');
    };

    const handleListAllSurveys = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/instructor/listresults');
    };

    const handleMySavedSurvey = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/instructor/listsurveys');
    };

    const handleAcceptSurveys = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/admin/acceptsurveys');
    };

    // Retrieve user information from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));



    if (loggedInUser.appUserRole === "ADMIN") {
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
                        <p>Name: {loggedInUser && loggedInUser.name}</p>
                        <p>Email: {loggedInUser && loggedInUser.email}</p>
                        <p>ID: {loggedInUser && loggedInUser.userId}</p>
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
                        <button onClick={handleDefineSemester}>Semester Settings</button>
                    </div>
                </div>
                <div className={"fourth-container"}>
                    <div>
                        <p style={{fontSize: '1.2rem'}}>Enable Users</p>
                        <button onClick={handleEnableUsers}>Enable Users </button>
                    </div>
                </div>
                <div className={"fifth-container"}>
                    <div>
                        <p style={{fontSize: '1.2rem'}}>Accept Surveys</p>
                        <button onClick={handleAcceptSurveys}>Accept Surveys</button>
                    </div>
                </div>
            </>

        );
    }
    if (loggedInUser.appUserRole === "DEPARTMENT_MANAGER") {
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
                        <p>Name: {loggedInUser && loggedInUser.name}</p>
                        <p>Email: {loggedInUser && loggedInUser.email}</p>
                        <p>ID: {loggedInUser && loggedInUser.userId}</p>
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
                        <p style={{fontSize: '1.2rem'}}>Assign Instructors to Courses
                        </p>
                        <button onClick={handleAssignInstructors} >Assign </button>
                    </div>
                </div>
                <div className={"thirth-container"}>
                    <div>
                        <p style={{fontSize: '1.2rem'}}>See Evaluation Results</p>
                        <button onClick={handleAllResults} > See Evaluation Results</button>
                    </div>
                </div>

            </>

        );
    }
    if (loggedInUser.appUserRole === "INSTRUCTOR") {
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
                        <p>Name: {loggedInUser && loggedInUser.name}</p>
                        <p>Email: {loggedInUser && loggedInUser.email}</p>
                        <p>ID: {loggedInUser && loggedInUser.userId}</p>
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
                <div className={"fourth-container"}>
                    <div>
                        <p style={{fontSize: '1.2rem'}}>List Surveys Result
                        </p>
                        <button onClick={handleListAllSurveys}>List Surveys Result  </button>
                    </div>
                </div>
                <div className={"fifth-container"}>
                    <div>
                        <p style={{fontSize: '1.2rem'}}>My Saved Survey
                        </p>
                        <button onClick={handleMySavedSurvey}>My Saved Survey </button>
                    </div>
                </div>
            </>
        );
    }
    if (loggedInUser.appUserRole === "STUDENT") {
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

                <div className={"dashboard"}>

                </div>
                <div className={"profile-container"}>
                    <div>
                        <p style={{fontSize: '1.5rem'}}>Profile</p>
                        <img src="/images/profile.jpg" alt="Icon" style={{width: '60%', maxHeight: '60%'}}/>
                        <p>Name: {loggedInUser && loggedInUser.name}</p>
                        <p>Email: {loggedInUser && loggedInUser.email}</p>
                        <p>ID: {loggedInUser && loggedInUser.userId}</p>
                        <button onClick={handleView}>View Profile</button>
                    </div>
                </div>
                <div className={"courses-container"}>
                    <div>
                        <p style={{fontSize: '1.5rem'}}>Course Schedule</p>
                        <button onClick={handleCourseList}>Course Schedule</button>
                    </div>
                </div>
                <div className={"evaluation-container"}>
                    <div>
                        <p style={{fontSize: '1.5rem'}}>Evaluation Forms</p>
                        <button onClick={handleSurveysList}>Evaluation Forms</button>
                    </div>
                </div>
            </>
        );
    }
};
export default MyPage;