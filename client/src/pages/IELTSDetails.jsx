import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuxilliaryServices.css'; // Link the CSS file

export default function IELTSDetails() {
    const location = useLocation();
    const ieltsData = location.state?.ieltsData || [];

    return (
        <div className="ielts-container">
            <h3 className="ielts-title">IELTS Results</h3>
            {ieltsData.length === 0 ? (
                <p className="ielts-no-data">No IELTS data available.</p>
            ) : (
                ieltsData.map((ielts) => (
                    <div key={ielts._id} className="ielts-card">
                        <h4 className="ielts-id">Result ID: {ielts._id}</h4>
                        <div className="ielts-info">
                            <p><strong>Username:</strong> {ielts.username}</p>
                            <p><strong>Email:</strong> {ielts.email}</p>
                            <p><strong>Duration:</strong> {ielts.duration}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
