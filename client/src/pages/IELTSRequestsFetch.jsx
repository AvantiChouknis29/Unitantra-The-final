import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuxilliaryServices.css'
const IELTSRequestsFetch = () => {
    const [ieltsData, setIeltsData] = useState([]); // State to store fetched data
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);       // Error state
    const navigate = useNavigate();

    const ieltsClick = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token'); // Assuming your token is stored here
            const response = await fetch('https://unitantra-backend.onrender.com/api/admin/ielts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Authorization header with token
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();       // Parse the response
            setIeltsData(data);                       // Set the state with data
            navigate('/admin/ielts-details', { state: { ieltsData: data } }); // Navigate to details page
        } catch (error) {
            console.error('Error fetching IELTS results:', error);
            setError('There was an error fetching IELTS results.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="div-1">
            <br></br> <button className="my-btn" onClick={ieltsClick}>Get IELTS Requests</button>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default IELTSRequestsFetch;
