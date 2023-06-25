import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from "react-router-dom";

const ShareDocuments = () => {
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [receiver, setReceiver] = useState('');
    const [instructors, setInstructors] = useState([]);
    const [sender, setSender] = useState(loggedInUser.userId);
    const [filteredInstructors, setFilteredInstructors] = useState([]);
    const [sharedDocuments, setSharedDocuments] = useState([]);
    const dropdownRef = useRef();

    useEffect(() => {
        if (loggedInUser) {
            setSender(loggedInUser.userId);
            console.log("Refresh attım",sender)
        }
        if (loggedInUser && loggedInUser.appUserRole !== 'DEPARTMENT_MANAGER') {
            alert("You're not authorized for this page!");
            navigate('/mypage/viewprofile');
        }
        fetchInstructors();
        fetchSharedDocuments();
    }, []);

    const fetchInstructors = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v1/list/instructors');
            const data = await response.json();
            setInstructors(data);

            if (loggedInUser) {
                setSender(loggedInUser.userId);
            }
        } catch (error) {
            console.error('Error fetching instructors', error);
        }
    };


    const fetchSharedDocuments = async () => {
        let sharedWith2 = "";
        try {
            const response = await fetch('http://localhost:8080/api/v1/documents/shared', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({owner:sender})
            });

            if (!response.ok) {
                throw new Error('Error fetching shared documents');
            }
            const data = await response.json();
            setSharedDocuments(data);
        } catch (error) {
            console.error('Error fetching shared documents', error);
        }
    };



    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const handleReceiverSelect = event => {
        setReceiver(event.target.value);
        setFilteredInstructors([]);
    };

    const handleClickOutside = event => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setFilteredInstructors([]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async event => {
        event.preventDefault();

        if (receiver) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('owner', sender);
            formData.append('receiver', receiver);

            try {
                const response = await fetch('http://localhost:8080/api/v1/documents/upload', {
                    method: 'POST',
                    body: formData,
                });
                if (response.ok) {
                    fetchSharedDocuments();
                    navigate("/mypage/depman/uploaddocument")
                    // Başarı durumu için ek işlemleri burada yapabilirsiniz
                } else {
                    console.error('Error uploading file');
                    // Hata durumu için ek işlemleri burada yapabilirsiniz
                }
            } catch (error) {
                console.error('Error uploading file', error);
                // Hata durumu için ek işlemleri burada yapabilirsiniz
            }
        } else {
            console.error('Receiver is not selected');
            // Alıcı seçilmemişse ilgili durumu burada ele alabilirsiniz
        }
    };

    return (
        <div>
            <h1>Upload Page</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file">File:</label>
                    <input type="file" id="file" onChange={handleFileChange} />
                </div>
                <div>
                    <label htmlFor="receiver">Receiver:</label>
                    <div className="dropdown" ref={dropdownRef}>
                        <select className="receiver-dropdown" value={receiver} onChange={handleReceiverSelect}>
                            <option value="">Select receiver</option>
                            {instructors.map(instructor => (
                                <option key={instructor.id} value={instructor.userId}>
                                    {instructor.userId} - {instructor.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" >Upload</button>
            </form>

            <h2>Shared Documents:</h2>
            {sharedDocuments.length > 0 ? (
                <ul>
                    {sharedDocuments.map(document => (
                        <li key={document}>{document}</li>
                    ))}
                </ul>
            ) : (
                <p>No shared documents available.</p>
            )}
        </div>
    );
};

export default ShareDocuments;
