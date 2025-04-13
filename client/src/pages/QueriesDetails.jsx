import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuxilliaryServices.css'; // Link the CSS file

const QueriesDetails = () => {
    const location = useLocation();
    const queriesData = location.state?.queriesData || [];

    return (
        <div className="queries-container">
            <h2 className="queries-title">Queries Details</h2>
            {queriesData.length > 0 ? (
                <ul className="queries-list">
                    {queriesData.map((query, index) => (
                        <li key={index} className="queries-card">
                            <p className="queries-info">
                                 <strong>Username:</strong> {query.username}<br />
                                <strong>Phone:</strong> {query.phone}<br />
                                <strong>Email:</strong> {query.email}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="queries-no-data">No queries found.</p>
            )}
        </div>
    );
};

export default QueriesDetails;
