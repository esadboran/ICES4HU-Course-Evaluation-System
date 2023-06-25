import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const EnableStudent = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [managedUser, setManagedUser] = useState(null);

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
            handleList(); // Trigger the handleList function when the component mounts
        }
    }, [navigate]);

    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    const handleList = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/list/students/nonenabled', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUsers(data); // Update the users state with the received data
                setError('');
            } else {
                setError('An error occurred while fetching user list');
            }
        } catch (error) {
            setError('An error occurred while fetching user list');
        }
    };


    const handleEnableClick = async (user) => {
        setManagedUser(user);
        localStorage.setItem('managedUser', JSON.stringify(user));

        try {
            let email = user.email;
            const response = await fetch('http://localhost:8080/api/v1/enable', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email}),
            });


            if (response.ok) {
                try {
                    const response = await fetch('http://localhost:8080/api/v1/list/students/nonenabled', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUsers(data); // Update the users state with the received data
                        setError('');
                        navigate("/mypage/admin/enablestudent");
                    } else {
                        setError('An error occurred while fetching user list');
                    }
                } catch (error) {
                    setError('An error occurred while fetching user list');
                }
            } else {
                setError('An error occurred while fetching user list');
            }
        } catch (error) {
            setError('An error occurred while fetching user list');
        }
    };


    // Retrieve user information from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

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
                    <button onClick={handleListUsers}>List Users</button>
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
                    <button onClick={handleEnableUsers}>Enable Users</button>
                </div>
            </div>
            <div className="menu_objects"
                 style={{
                     position: "absolute",
                     top: 350,
                     left: 700,
                     backgroundColor: "lightgoldenrodyellow",
                     justifyContent: "center",
                     height:900
                 }}>
                <img src="/images/logo.png" alt="Resim"/>
                <h1>ICES4HU</h1>
                <h2 className="form-title">Enable Student</h2>
                <div className={"form-styling"} style={{position: "absolute", top: 350, left: 5, height:500}}>
                    <div>

                        <h2>Enable students</h2>

                        {users.length > 0 ? (
                            <ul>
                                {users.map((user) => (
                                    <li key={user.id}>
                                        <p style={{fontSize:"20px"}}>{user.name}</p>
                                        <button onClick={() => handleEnableClick(user)} style={{backgroundColor:"lightskyblue"}}>Enable</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No users to display</p>
                        )}
                        <button onClick={handleCancel} style={{backgroundColor:"darkred", right:540}}>Cancel</button>
                        {error && <p>{error}</p>}
                    </div>
                </div>
            </div>



        </>

    );
};

export default EnableStudent;