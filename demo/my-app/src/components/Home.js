import React from 'react';

import '../css/Home.css';

const Home = () => {
    return (
        <div className="body" style={{  height: '980px' }}>
            <nav style={{ backgroundColor: 'darkkhaki', height: '50px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 1rem' }}>
                    <h2 style={{ fontSize: '2rem' }}>ICES4HU</h2>
                    <ul style={{ listStyleType: 'none', display: 'flex' }}>
                        <li style={{ marginRight: '2rem'}}>
                            <a style={{backgroundColor: 'olivedrab',fontSize: '1.5rem',borderRadius:"5px"}} href="/registration">Register</a></li>
                        <li><a style={{backgroundColor: 'olivedrab',fontSize: '1.5rem', borderRadius:"5px"}} href="/login"> Login </a></li>
                    </ul>

                </div>
                <img src="/images/logo.png" alt="Resim" />
                <img src="/images/name.png" alt="Resim" style={{margin : "50px"}} />

            </nav>
            <div style={{ display: 'flex',  }}>
                {/* Sol Taraftaki Resim */}
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <img src="/images/h.jpg" alt="Resim" style={{ maxWidth: '100%', maxHeight: '100%' , margin : "250px"}} />
                </div>
                {/* Sağ Taraftaki Metin */}
                <div style={{ flex: 1, padding: '1rem',margin : "150px" }}>
                    <h2 style={{ fontSize: '4rem' , color: "ICe"}}>Welcome to ICES4HU </h2>
                    <p style={{ fontSize: '1.5rem'  }}>Are you a student or instructor at Hacettepe University? Look no further!</p>
                    <p style={{ fontSize: '1.5rem' , textAlign: "justify" }}>
                        We're thrilled to introduce the Instructor and Course Evaluation System for Hacettepe University, also known as ICES4HU!
                        ICES4HU is a cutting-edge online platform designed specifically for Hacettepe University to revolutionize the way instructors and courses are evaluated.
                        Our system provides an efficient and convenient way for students to provide valuable feedback on their learning experience.
                        Through electronic surveys, students can share their thoughts, opinions, and suggestions, all aimed at improving the quality of courses and teaching methods.</p>
                </div>

            </div>
        </div>
    );
};

export default Home;
