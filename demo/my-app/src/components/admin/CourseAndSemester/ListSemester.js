import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const ListSemester = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [semesters, setSemesters] = useState([]);
    const [managedSemester, setManagedSemester] = useState(null);
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
            handleListSemesters(); // Trigger the handleListSemesters function when the component mounts
        }
    }, [navigate]);

    const handleListSemesters = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/semesterlist/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setSemesters(data); // Update the semesters state with the received data
                setError('');
            } else {
                setError('An error occurred while fetching semesters');
            }
        } catch (error) {
            setError('An error occurred while fetching semesters');
        }
    };

    const handleSemesterClick = (semester) => {
        setManagedSemester(semester);
        localStorage.setItem('managedSemester', JSON.stringify(semester));
        navigate(`/mypage/admin/updatecourse`);
    };

    const handleReturn = () => {
        navigate('/mypage');
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

    const handleDefineNewSemester= ()=> {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/admin/definesemester');
    };

    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    // Retrieve user information from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const backgroundHeight = `${semesters.length  * 240}px`;
    const backgroundHeightDashboard = `${semesters.length  * 280}px`;
    const backgroundHeightInner = `${semesters.length  * 120}px`;
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

            <div className={"dashboard-admin"} style={{height:backgroundHeightDashboard}}>

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

            <div className="menu_objects"
                 style={{
                     position: "absolute",
                     top: 350, left: 700,
                     backgroundColor: "lightgoldenrodyellow",
                     justifyContent: "center",
                     height:backgroundHeight
                 }}>
                <img style={{position:"absolute",top: 10, left: 20}} src="/images/logo.png" alt="Resim"/>

                <button onClick={() => handleDefineNewSemester()} style={{position:"absolute",top: 100, right: 500,padding:"50px"}}>DEFINE SEMESTER</button>

                <div className={"semester"} style={{position: "absolute", top: 350, left: 5,height:backgroundHeightInner}}>
                    <div>
                        <h2>Semester List</h2>
                        {semesters.length > 0 ? (
                            <ul>
                                {semesters.map((semester) => (
                                    <li key={semester.id}>
                                        <button style={{backgroundColor:"darkslategray", borderRadius: "10px",padding:"20px"}}
                                                onClick={() => handleSemesterClick(semester)}>{semester.semesterName}</button>
                                        <p></p>
                                    </li>

                                ))}
                            </ul>
                        ) : (
                            <p>No semesters to display</p>
                        )}

                        <p></p>

                        <button onClick={handleReturn} style={{backgroundColor:"darkred" ,borderRadius:"5px", right:535, position:"absolute"}}>Cancel</button>
                    </div>
                </div>
            </div>


        </>


    );
};

export default ListSemester;