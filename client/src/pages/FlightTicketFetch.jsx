import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuxilliaryServices.css'
const FlightTicketFetch = () => {
    const [ticketData, setTicketData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleFlightTicketClick = async () => {
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token'); // Assuming your token is stored here
            const response = await fetch('https://unitantra-backend.onrender.com/api/admin/flights', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setTicketData(data);
            navigate('/admin/ticket-details', { state: { ticketData: data } }); // Navigate to details page
        } catch (error) {
            console.error('Error fetching flight tickets:', error);
            setError('There was an error fetching flight tickets.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="div-1">
            <br>
            </br> <br>
            </br>
            <button className="my-btn" onClick={handleFlightTicketClick}>Get Flight Ticket Requests</button>

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default FlightTicketFetch;
