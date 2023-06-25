import React, { useState, useEffect } from 'react';

const DownloadDocuments = () => {
    const [receivedDocuments, setReceivedDocuments] = useState([]);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    useEffect(() => {
        if (loggedInUser) {
            fetchReceivedDocuments();
        }
    }, [loggedInUser]);

    const fetchReceivedDocuments = async () => {
        let sharedWith2 = "";
        try {
            const response = await fetch('http://localhost:8080/api/v1/documents/received', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({sharedWith:loggedInUser.userId})
            });

            if (!response.ok) {
                throw new Error('Error fetching shared documents');
            }
            const data = await response.json();
            setReceivedDocuments(data);
        } catch (error) {
            console.error('Error fetching shared documents', error);
        }
    };

    const handleDownload = async (fileName) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/download/${fileName}`);
            if (!response.ok) {
                throw new Error('Error downloading file');
            }
            console.log("download")
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading file', error);
        }
    };

    return (
        <div>
            <h1>Download Page</h1>
            <h2>Received Documents:</h2>
            {receivedDocuments.length > 0 ? (
                <ul>
                    {receivedDocuments.map((document) => (
                        <li key={document}>
                            {document}{' '}
                            <button onClick={() => handleDownload(document)}>Download</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No received documents available.</p>
            )}
        </div>
    );
};

export default DownloadDocuments;