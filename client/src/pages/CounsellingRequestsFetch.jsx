import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuxilliaryServices.css'
const CounsellingRequestsFetch = () => {
    const [counsellingData, setCounsellingData] = useState([]);  // State to store fetched data
    const [loading, setLoading] = useState(false);  // Loading state
    const [error, setError] = useState(null);  // Error state
    const navigate = useNavigate();

    const counsellingClick = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');  // Assuming your token is stored here
            const response = await fetch('https://unitantra-backend.onrender.com/api/admin/counselling', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Authorization header with token
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();  // Parse the response
            setCounsellingData(data);  // Set the state with data
            navigate('/admin/counselling-details', { state: { counsellingData: data } });  // Navigate to details page
        } catch (error) {
            console.error('Error fetching Counselling requests:', error);
            setError('There was an error fetching Counselling requests.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="div-1">
            <br />
            <button className="my-btn" onClick={counsellingClick}>Click here to get Counselling Requests</button>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default CounsellingRequestsFetch;
