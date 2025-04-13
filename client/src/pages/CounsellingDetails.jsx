import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuxilliaryServices.css'; // Link the CSS file

export default function CounsellingDetails() {
    const location = useLocation();
    const counsellingData = location.state?.counsellingData || [];

    return (
        <div className="counselling-container">
            <h3 className="counselling-title">Counselling Details</h3>
            {counsellingData.length === 0 ? (
                <p className="counselling-no-data">No counselling data available.</p>
            ) : (
                counsellingData.map((counselling) => (
                    <div key={counselling._id} className="counselling-card">
                        <h4 className="counselling-id">ID: {counselling._id}</h4>
                        <div className="counselling-info">
                            <p><strong>Username:</strong> {counselling.username}</p>
                            <p><strong>Email:</strong> {counselling.email}</p>
                            <p><strong>Phone:</strong> {counselling.phone}</p>
                            <p><strong>Country:</strong> {counselling.country}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
