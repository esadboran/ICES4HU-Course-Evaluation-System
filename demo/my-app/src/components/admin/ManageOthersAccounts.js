import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ManageOthersAccounts = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [id, setId] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!loggedInUser) {
            navigate('/login');
        }
        /*
        if (loggedInUser && loggedInUser.appUserRole !== 'ADMIN') {
            alert("You're not authorized for this page!");
            navigate('/mypage/viewprofile');
        }
         */
    }, [navigate]);

    useEffect(() => {
        // Retrieve managed user from local storage
        const managedUser = JSON.parse(localStorage.getItem('managedUser'));
        if (managedUser) {
            setName(managedUser.name);
            setEmail(managedUser.email);
            setPhoneNumber(managedUser.phoneNumber);
            setAddress(managedUser.address);
            setId(managedUser.userId);
            setRole(managedUser.appUserRole);
        }
    }, []);

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


    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleLogout = () => {
        // Remove user from local storage and navigate to login page
        localStorage.removeItem('loggedInUser');
        navigate('/login');
    };

    const handleManageProfile = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                'http://localhost:8080/api/v1/manageOtherAccounts/updateOtherAccounts',
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                        phoneNumber,
                        address,
                        role
                    }),
                }
            );

            if (response.ok) {
                setError('');
                navigate('/mypage/admin/listusers');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('An error occurred while submitting');
        }
    };

    const handleBan = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/ban', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNumber,
                    address,
                }),
            });

            if (response.ok) {
                setError('');
                navigate('/mypage/admin/listusers');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('An error occurred while submitting');
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v1/disable', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phoneNumber,
                    address,
                }),
            });

            if (response.ok) {
                setError('');
                navigate('/mypage/admin/listusers');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('An error occurred while submitting');
        }
    };

    // Retrieve user information from local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const managedUser = JSON.parse(localStorage.getItem('managedUser'));

    return (
        <>
            <nav style={{ backgroundColor: 'darkkhaki', height: '50px' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        padding: '0 1rem',
                    }}
                >
                    <h2 style={{ fontSize: '2rem' }}>ICES4HU</h2>
                </div>
            </nav>
            <div className="background">
                <div className="login-container">
                    <img src="/images/logo.png" alt="Resim" />
                    <h1>ICES4HU</h1>
                    {error && <p>{error}</p>}
                    <div>
                        <div className="auth-form-container">
                            <p style={{ fontSize: '24px', alignItems: 'center' }}>LOGIN</p>
                            <form
                                className="login-form"
                                style={{ alignItems: 'center' }}
                                onSubmit={handleManageProfile}
                            >
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="name"
                                        value={name}
                                        placeholder={managedUser && managedUser.name}
                                        onChange={handleNameChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder={managedUser && managedUser.email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address">Address</label>
                                    <input
                                        type="address"
                                        value={address}
                                        placeholder={managedUser && managedUser.address}
                                        onChange={handleAddressChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input
                                        type="phoneNumber"
                                        value={phoneNumber}
                                        placeholder={managedUser && managedUser.phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="userId">User Id</label>
                                    <input
                                        type="userId"
                                        value={id}
                                        placeholder={managedUser && managedUser.userId}
                                        onChange={handleIdChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="role">User Role</label>
                                    <input
                                        type="role"
                                        value={role}
                                        placeholder={managedUser && managedUser.appUserRole}
                                        onChange={handleRoleChange}
                                    />
                                </div>
                                <p></p>
                                <button type="submit">Submit Changes</button>
                            </form>
                            <p></p>
                            <button onClick={handleBan}>Ban</button>
                            <button onClick={handleDelete}>Delete</button>
                            <p></p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageOthersAccounts;