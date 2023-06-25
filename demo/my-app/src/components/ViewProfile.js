import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/ViewProfile.css';
const ViewProfile = () => {
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
    const handleCancel = () => {
        navigate('/mypage');
    };
    const handleManage = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/manageprofile');
    };
    const handleShareDocuments= () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/depman/uploaddocument');
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
    const handleCreateSurvey= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/createsurvey");
    };

    const handleDownloadDocuments= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/downloaddocuments");
    };
    const handleCourseSchedule= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/student/mycourses");
    };
    const handleAssignStudents= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/instructor/assignstudent");
    };

    const handleAssignInstructors= () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/depman/assigninstructor");
    };

    // Retrieve user information from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

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
                        <button>View Profile</button>
                    </div>
                </div>
                <div className={"courses-container"}>
                    <div>
                        <p style={{fontSize: '1.5rem'}}>Course Schedule</p>
                        <button onClick={handleCourseSchedule}>Course Schedule</button>
                    </div>
                </div>
                <div className={"evaluation-container"}>
                    <div>
                        <p style={{fontSize: '1.5rem'}}>Evaluation Forms</p>
                        <button>Evaluation Forms</button>
                    </div>
                </div>

                <div className="menu_objects" style={{ position: "absolute", top: 350, left: 700 , backgroundColor:"lightgoldenrodyellow"}}>
                    <h3 style={{fontSize:"2rem"}}>PROFILE</h3>
                    <img src="/images/profile.jpg" alt="Icon" style={{width: '10%', maxHeight: '20%'}}/>
                    <h2>User Information</h2>
                    <p>Name: {loggedInUser && loggedInUser.name}</p>
                    <p>Id: {loggedInUser && loggedInUser.userId}</p>
                    <p>Email: {loggedInUser && loggedInUser.email}</p>
                    <p>Role: {loggedInUser && loggedInUser.appUserRole}</p>
                    <p>Address: {loggedInUser && loggedInUser.address}</p>
                    <p>phoneNumber: {loggedInUser && loggedInUser.phoneNumber}</p>
                    <button onClick={handleManage}>Manage Profile Details</button>
                    <p></p>
                    <button style={{backgroundColor:"darkred"}} onClick={handleCancel}>Cancel</button>
                </div>
            </>

        );
    }
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
                        <button >View Profile</button>
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

                <div className="menu_objects" style={{ position: "absolute", top: 350, left: 700 , backgroundColor:"lightgoldenrodyellow"}}>
                    <h3 style={{fontSize:"2rem"}}>PROFILE</h3>
                    <img src="/images/profile.jpg" alt="Icon" style={{width: '10%', maxHeight: '20%'}}/>
                    <h2>User Information</h2>
                    <p>Name: {loggedInUser && loggedInUser.name}</p>
                    <p>Id: {loggedInUser && loggedInUser.userId}</p>
                    <p>Email: {loggedInUser && loggedInUser.email}</p>
                    <p>Role: {loggedInUser && loggedInUser.appUserRole}</p>
                    <p>Address: {loggedInUser && loggedInUser.address}</p>
                    <p>phoneNumber: {loggedInUser && loggedInUser.phoneNumber}</p>
                    <button onClick={handleManage}>Manage Profile Details</button>
                    <p></p>
                    <button style={{backgroundColor:"darkred"}} onClick={handleCancel}>Cancel</button>
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
                        <button>View Profile</button>
                    </div>
                </div>
                <div className={"first-container"}>
                    <div>
                        <p style={{fontSize: '1.2rem'}}>Share Documents</p>
                        <button onClick={handleShareDocuments} >Share Documents</button>
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
                        <button onClick={handleAssignInstructors}>Assign </button>
                    </div>
                </div>
                <div className={"fourth-container"}>
                    <div>
                        <p style={{fontSize: '1.2rem'}}>See Evaluation Results</p>
                        <button>See Evaluation Results</button>
                    </div>
                </div>


                <div className="menu_objects" style={{ position: "absolute", top: 350, left: 700 , backgroundColor:"lightgoldenrodyellow"}}>
                    <h3 style={{fontSize:"2rem"}}>PROFILE</h3>
                    <img src="/images/profile.jpg" alt="Icon" style={{width: '10%', maxHeight: '20%'}}/>
                    <h2>User Information</h2>
                    <p>Name: {loggedInUser && loggedInUser.name}</p>
                    <p>Id: {loggedInUser && loggedInUser.userId}</p>
                    <p>Email: {loggedInUser && loggedInUser.email}</p>
                    <p>Role: {loggedInUser && loggedInUser.appUserRole}</p>
                    <p>Address: {loggedInUser && loggedInUser.address}</p>
                    <p>phoneNumber: {loggedInUser && loggedInUser.phoneNumber}</p>
                    <button onClick={handleManage}>Manage Profile Details</button>
                    <p></p>
                    <button style={{backgroundColor:"darkred"}} onClick={handleCancel}>Cancel</button>
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
                        <button>View Profile</button>
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
                    <h3 style={{fontSize:"2rem"}}>PROFILE</h3>
                    <img src="/images/profile.jpg" alt="Icon" style={{width: '10%', maxHeight: '20%'}}/>
                    <h2>User Information</h2>
                    <p>Name: {loggedInUser && loggedInUser.name}</p>
                    <p>Id: {loggedInUser && loggedInUser.userId}</p>
                    <p>Email: {loggedInUser && loggedInUser.email}</p>
                    <p>Role: {loggedInUser && loggedInUser.appUserRole}</p>
                    <p>Address: {loggedInUser && loggedInUser.address}</p>
                    <p>phoneNumber: {loggedInUser && loggedInUser.phoneNumber}</p>
                    <button onClick={handleManage}>Manage Profile Details</button>
                    <p></p>
                    <button style={{backgroundColor:"darkred"}} onClick={handleCancel}>Cancel</button>
                </div>
            </>
        );
    }



};

export default ViewProfile;