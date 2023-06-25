import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const ManageProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            navigate('/login');
        }
    }, [navigate]);

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    const handleCancel = () => {
        // Remove user from local storage and navigate to login page
        navigate('/mypage/viewprofile');
    };

    const handleManageProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/updateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, phoneNumber, address  }),
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                setError('');
                navigate('/mypage/viewprofile');
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message;
                alert(`${errorMessage}`);
            }
        } catch (error) {
            setError('An error occurred while submitting');
        }
    };

    // Retrieve user information from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));




    return (
        <>
            <nav style={{backgroundColor: 'darkkhaki', height: '50px'}}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    padding: '0 1rem'
                }}>
                    <h2 style={{fontSize: '2rem' }}>ICES4HU</h2>
                </div>
            </nav>
            <div className="background">
                <div className="login-container">
                    <img src="/images/logo.png" alt="Resim"/>
                    <h1>ICES4HU</h1>
                    {error && <p>{error}</p>}
                    <div>
                        <div className="auth-form-container">
                            <p style={{fontSize: "24px",alignItems:"center"}}>LOGIN</p>
                            <form className="login-form" style={{alignItems:"center"}} onSubmit={handleManageProfile}>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="name" value={name} placeholder={loggedInUser && loggedInUser.name} onChange={handleNameChange} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" value={email} placeholder={loggedInUser && loggedInUser.email} onChange={handleEmailChange} />
                                </div>
                                <div>
                                    <label htmlFor="password">Password</label>
                                    <input type="password" value={password} onChange={handlePasswordChange} />
                                </div>
                                <div>
                                    <label htmlFor="address">Address</label>
                                    <input type="address" value={address} placeholder={loggedInUser && loggedInUser.address} onChange={handleAddressChange} />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input type="phoneNumber" value={phoneNumber} placeholder={loggedInUser && loggedInUser.phoneNumber} onChange={handlePhoneNumberChange} />
                                </div>
                                <p></p>
                                <button type="submit">Submit Changes</button>
                            </form>
                            <p></p>
                            <button  onClick={handleLogout}>Logout</button>
                            <button  onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default ManageProfile;