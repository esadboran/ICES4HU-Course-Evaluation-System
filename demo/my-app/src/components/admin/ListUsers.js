import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../css/ListUsers.css';
const ListUsers = () => {
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
            handleList(); // Trigger the handleList function when the component mounts
        }
    }, [navigate]);



    const handleList = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/list/all', {
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

    const handleUserClick = (user) => {
        setManagedUser(user);
        localStorage.setItem('managedUser', JSON.stringify(user));
        navigate('/mypage/admin/manageothersaccounts');
    };

    // Retrieve user information from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    const handleDefineSemester = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/admin/listsemester');
    };
    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };
    const backgroundHeight = `${users.length  * 180}px`;
    const handleEnableUsers = () => {
        // Remove user from local storage and navigate to login page
        navigate("/mypage/admin/enablestudent");
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
                    <button onClick={handleDefineSemester}>Semester Settings</button>
                </div>
            </div>
            <div className={"fourth-container"}>
                <div>
                    <p style={{fontSize: '1.2rem'}}>Enable Users</p>
                    <button onClick={handleEnableUsers}>Enable Users </button>
                </div>
            </div>

            <div className="menu_objects-r"
                 style={{
                     position: "absolute",
                     top: 100,
                     left: 700,
                     backgroundColor: "lightgoldenrodyellow",
                     justifyContent: "center",
                     height:backgroundHeight
                 }}>
                <img src="/images/logo.png" alt="Resim" style={{width: '20%', maxHeight: '40%'}}/>
                <h1>ICES4HU</h1>
                <div >
                    <h2>User List</h2>
                    {users.length > 0 ? (
                        <ul >
                            {users.map((user) => (
                                <>
                                    <li className={"inner_menu_objects-ln"}  key={user.id}>
                                        <img src="/images/profile.jpg" style={{width: '20%', maxHeight: '40%'}} alt="Resim"/>
                                        <p></p>
                                        <button style={{width: '20%', maxHeight: '20%', backgroundColor:"steelblue"}} onClick={() => handleUserClick(user)}>{user.name}</button>
                                        <p></p>
                                    </li>
                                    <p></p>
                                </>

                            ))}
                        </ul>
                    ) : (
                        <p>No users to display</p>
                    )}
                    <p></p>
                    <button style={{backgroundColor:"darkred", right:260,position:"absolute"}} onClick={handleCancel}>Cancel</button>

                    {managedUser && (
                        <div>
                            <h2>Managed User</h2>
                            <p>Name: {managedUser.name}</p>
                            <p>Id: {managedUser.userId}</p>
                            <p>Email: {managedUser.email}</p>
                            <p>Role: {managedUser.appUserRole}</p>
                            <p>Address: {managedUser.address}</p>
                            <p>phoneNumber: {managedUser.phoneNumber}</p>
                        </div>
                    )}
                    {error && <p>{error}</p>}
                </div>
            </div>
        </>

    );
};

export default ListUsers;