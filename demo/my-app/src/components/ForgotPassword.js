import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/ForgotPassword.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/forgot_password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                navigate('/login');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('An error occurred while logging in');
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
                            <Link to="/">Home Page</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
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
                            <h2 className="form-title">FORGOT PASSWORD</h2>
                            <form onSubmit={handleForgotPassword}>
                                <p>Please enter your e-mail address</p>
                                <label htmlFor="name">E-mail</label>
                                <input
                                    type="text"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button className="link-btn" type="submit">Send reset mail</button>
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

}

export default ForgotPassword;
