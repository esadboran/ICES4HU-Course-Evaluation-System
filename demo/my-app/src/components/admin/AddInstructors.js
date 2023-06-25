import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../../css/AddInstructors.css';

const AddInstructors = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            navigate('/login');
        }
        if (!(loggedInUser.appUserRole === "ADMIN")) {
            alert("You're not authorized for this page!")
            navigate('/mypage/viewprofile');
        }
    }, [navigate]);

    const handleRegistration = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/v1/registration/instructor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password, userId}),
        });
        if (response.ok) {
            navigate('/mypage');
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            alert(`${errorMessage}`);
        }
    };
    const handleDefineSemester = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/admin/listsemester');
    };

    const handleEnableUsers = () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/admin/enablestudent");
    };
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
                 style={{position: "absolute", top: 350, left: 700, backgroundColor: "lightgoldenrodyellow", justifyContent:"center"}}>
                <img src="/images/logo.png" alt="Resim"/>
                <h1>ICES4HU</h1>
                <h2 className="form-title">INSTRUCTOR REGISTER</h2>
                <div className={"form-container"} style={{position: "absolute", top: 350, left: 370}} >
                    <form onSubmit={handleRegistration} >
                        <label htmlFor="name" >Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label htmlFor="userId">ID</label>
                        <input
                            type="text"
                            placeholder="ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                        <button className="link-btn" type="submit">Add Instructor</button>
                        <p></p>
                        <button style={{backgroundColor:"darkred"}} onClick={handleCancel}>Cancel</button>
                    </form>
                </div>


            </div>

        </>
    );
};

export default AddInstructors;