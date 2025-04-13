import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuxilliaryServices.css'
const AccomodationFetch = () => {
    const [accomodationData, setAccomodationData] = useState([]);  // Fixed variable name
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const accomodationClick = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token'); // Assuming your token is stored here
            const response = await fetch('https://unitantra-backend.onrender.com/api/admin/accomodation', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,  // Authorization header with token
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setAccomodationData(data);  // Corrected set function
            navigate('/admin/accomodation-details', { state: { accomodationData: data } }); // Navigate to details page
        } catch (error) {
            console.error('Error fetching accommodation requests:', error);
            setError('There was an error fetching accommodation requests.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="div-1">
           
            <button className="my-btn" onClick={accomodationClick}>Get Accomodation Requests</button>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default AccomodationFetch;
