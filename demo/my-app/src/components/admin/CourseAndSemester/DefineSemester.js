import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../../css/DefineSemester.css';

const AddSemester = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [semesterName, setSemesterName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


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

    const handleSemesterSubmit = async (e) => {
        e.preventDefault();

        try {
            const semesterData = {
                startDate,
                endDate,
                semesterName,
            };

            const response = await fetch('http://localhost:8080/api/v1/add_semester', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(semesterData),
            });

            console.log("Response**>", response)
            if (response.ok) {
                alert("Semester Saved")
                navigate('/mypage/admin/listsemester');
            } else {
                setError('Failed to add semester');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while adding semester');
        }
    };

    const handleListSemester = () => {
        navigate('/mypage/admin/listsemester');
    };
    const handleUpdateSemester = () => {
        navigate("/mypage/admin/updatecourse");
    };
    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    const handleDefineSemester = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/admin/listsemester');
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
                     justifyContent: "center"
                 }}>
                <img src="/images/logo.png" alt="Resim"/>
                <h1>ICES4HU</h1>
                <h2 className="form-title">Add Semester</h2>
                <div className={"semester"} style={{position: "absolute", top: 350, left: 5}}>

                    <form onSubmit={handleSemesterSubmit}>
                        <label>Start Date:</label>
                        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                               required/>
                        <label>End Date:</label>
                        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/>

                        <label>Semester Name:</label>
                        <input type="text" value={semesterName} onChange={(e) => setSemesterName(e.target.value)}
                               required/>

                        {error && <p>{error}</p>}
                        <button type="submit">Add Semester</button>
                    </form>
                    <p></p>
                    <button type="submit" onClick={() => handleListSemester()}
                            style={{backgroundColor: "darkblue"}}>List Semester
                    </button>

                </div>
            </div>

        </>

    );
};

export default AddSemester;