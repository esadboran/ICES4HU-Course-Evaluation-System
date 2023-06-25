import React, { useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import '../css/Login.css';
const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const user = await response.json();
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                setError('');
                navigate('/mypage');
            } else {
                const errorData = await response.json();
                const errorMessage = errorData.message;
                alert(`${errorMessage}`);
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    padding: '0 1rem'
                }}>
                    <h2 style={{fontSize: '2rem' }}>ICES4HU</h2>
                </div>
            </nav>
            <div className="background">
                <div className="login-container" >
                    <img src="/images/logo.png" alt="Resim"/>
                    <h1>ICES4HU</h1>
                    {error && <p>{error}</p>}
                    <div>
                        <div className="auth-form-container">
                            <p style={{fontSize: "24px",alignItems:"center"}}>LOGIN</p>
                            <form className="login-form" style={{alignItems:"center"}} onSubmit={handleSubmit}>
                                <label htmlFor="email">Email </label>
                                <div style = {{alignItems:"center"}}>
                                    <input type="email" placeholder="E-mail " value={email} onChange={handleEmailChange} required />
                                </div>

                                <label htmlFor="password">Password</label>
                                <div>
                                    <input type="password" placeholder="password" value={password} onChange={handlePasswordChange} required />
                                </div>
                                <p></p>
                                <button type="submit" style={{ background: 'darkgreen'}}>Login</button>
                            </form>
                            <p></p>
                            <Link style={{ background: 'steelblue', fontSize: '1.2em' ,color:"white"}} to="/registration">Don't you have an account?</Link>
                            <p></p>
                            <Link style={{ background: 'steelblue', fontSize: '1.2em' ,color:"white"}} to="/forgotpassword">Did you forgot your password?</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;