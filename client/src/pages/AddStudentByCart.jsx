import React, { useEffect } from 'react';
import { useAgencyAuth } from '../store/agency_auth'; // Adjust the import path as needed

const AgencyApplications = () => {
  const { application } = useAgencyAuth();

  useEffect(() => {
    console.log("Applications:", application);
  }, [application]);

  if (!application || application.length === 0) {
    return <p>No applications available.</p>;
  }

  return (
    <div>
      <h1>Agency Applications</h1>
      <ul>
        {application.map((app) => (
          <li key={app._id}>
            <div>
              <h2>{app.university}</h2>
              <p>Course: {app.course}</p>
              <p>User UID: {app.userUID || 'N/A'}</p>
              <p>Agency UID: {app.agencyId || 'N/A'}</p>
              <a href={app.link} target="_blank" rel="noopener noreferrer">More Info</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgencyApplications;
