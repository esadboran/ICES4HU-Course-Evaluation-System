import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Registration.css';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleRegistration = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/v1/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password, userId }),
        });

        if (response.ok) {
            navigate('/login');
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message;
            alert(`${errorMessage}`);
        }
    };
    return (
        <>
            <nav style={{backgroundColor: 'darkkhaki', height: '50px'}}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '100%',
                    padding: '0 1rem'
                }}>
                    <h2 style={{fontSize: '2rem'}}>ICES4HU</h2>
                    <ul className="nav-links">
                        <li>
                            <Link to="/home">Home Page</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="background">
                <div className="App">
                    <div className="login-container" >
                        <div>
                            <img src="/images/logo.png" alt="Resim"/>
                            <h1>ICES4HU</h1>
                            <h2 className="form-title">REGISTER</h2>
                            <form onSubmit={handleRegistration}>
                                <label htmlFor="name">Name</label>
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

                                <button className="link-btn" type="submit">Register</button>
                            </form>
                            <p></p>
                            <p>Do you have an account?</p>
                            <Link className="link-btn" style={{ background: 'darkgreen', color:"white"}} to="/login">Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Registration;