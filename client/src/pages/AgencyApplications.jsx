import React, { useEffect, useState } from 'react';
import { useAgencyAuth } from '../store/agency_auth'; // Adjust the import path as needed
import './AuxilliaryServices.css'
const AgencyApplications = () => {
    const { getToken, agency } = useAgencyAuth(); // Retrieve token and agency details from useAgencyAuth
    const [applications, setApplications] = useState([]);
    const [filteredApplications, setFilteredApplications] = useState([]);

    // Fetch all applications from the API
    const fetchApplications = async () => {
        try {
            const token = getToken(); // Retrieve token for authorization
            const response = await fetch(`https://unitantra-backend.onrender.com/api/agencyApplications`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }

            const data = await response.json();
            setApplications(data); // Store all applications
        } catch (error) {
            console.error('Error fetching applications:', error);
            alert('Failed to fetch applications.');
        }
    };

    // Filter applications based on agency._id from useAgencyAuth
    useEffect(() => {
        fetchApplications(); // Fetch applications when the component loads

        if (agency && agency._id) {
            const matchedApplications = applications.filter(app => app.agencyId === agency._id); // Compare agencyId with agency._id
            setFilteredApplications(matchedApplications); // Update state with filtered applications
        }
    }, [agency, applications]);

    return (
        <div className="agency-applications-container">
            <br></br><br></br>
            <h1 className="agency-applications-title">Your Applications</h1>
            <br></br>

            {filteredApplications.length === 0 ? (
                <p className="no-applications-message">No applications available for this agency.</p>
            ) : (
                <ul className="applications-list">
                    {filteredApplications.map((app) => (
                        <li key={app._id} className="application-item">
                            <div className="application-details">

                                <h2 className="university-name">{app.university}</h2>
                                <p className="course-info">Course: {app.course}</p>
                                <p className="user-uid">User UID: {app.userUID || 'N/A'}</p>
                                <p className="agency-uid">Agency UID: {app.agencyId || 'N/A'}</p>
                                <p className="agency-uid">Status: {app.mystatus || 'N/A'}</p>
                               
                                <a href={app.link} className="more-info-link" target="_blank" rel="noopener noreferrer">More Info</a>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AgencyApplications;
