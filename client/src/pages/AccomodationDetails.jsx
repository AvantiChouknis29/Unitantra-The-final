import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuxilliaryServices.css'; // Import the CSS file

export default function AccomodationDetails() {
    const location = useLocation();
    const accomodationData = location.state?.accomodationData || [];

    return (
        <div className="accomodation-container">
            <h3 className="accomodation-title">Accomodation Details</h3>
            {accomodationData.length === 0 ? (
                <p className="accomodation-no-data">No accomodation data available.</p>
            ) : (
                accomodationData.map((accomodation) => (
                    <div key={accomodation._id} className="accomodation-card">
                        <h4 className="accomodation-id">ID: {accomodation._id}</h4>
                        <div className="accomodation-info">
                            <p><strong>Username:</strong> {accomodation.username}</p>
                            <p><strong>Email:</strong> {accomodation.email}</p>
                            <p><strong>Phone:</strong> {accomodation.phone}</p>
                            <p><strong>Country:</strong> {accomodation.country}</p>
                            <p><strong>City:</strong> {accomodation.city}</p>
                            <p><strong>From:</strong> {accomodation.fromDate}</p>
                            <p><strong>To:</strong> {accomodation.toDate}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
