import React, { useEffect, useState } from 'react'; 
import './AgencyVerification.css'
import { Footer } from '../components/Footer/Footer';
const AgencyVerification = () => {
    const [agencies, setAgencies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('https://unitantra-backend.onrender.com/api/admin/agencies', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch agencies');
                }

                const data = await response.json();
                setAgencies(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAgencies();
    }, []);

    const handleAccept = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://unitantra-backend.onrender.com/api/admin/agencies/${id}/accept`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to accept agency');
            }

            const updatedAgency = await response.json();
            setAgencies(agencies.map(agency => agency._id === id ? updatedAgency : agency));
        } catch (error) {
            setError(error.message);
        }
    };

    const handleReject = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://unitantra-backend.onrender.com/api/admin/agencies/${id}/reject`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to reject agency');
            }

            const updatedAgency = await response.json();
            setAgencies(agencies.map(agency => agency._id === id ? updatedAgency : agency));
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (<>
        <div className="agency-verification">
            <h2 className="heading">Agencies</h2>
            <ul className="agency-list">
                {agencies.map((agency) => (
                    <li key={agency._id} className="agency-item">
                        <span className="agency-details">
                          <h5 className='fields'>Company Name:  {agency.companyname}</h5><br></br>
                          <h5 className='fields'>Email</h5> {agency.email}<br></br>
                          <h5 className='fields'>Phone</h5> {agency.phone}<br></br>
                          <h5 className='fields'>Country</h5> {agency.country}<br></br>
                          <h5 className='fields'>Status </h5> - {agency.verifiedAgent ? 'Verified' : 'Not Verified'}
                        </span>
                        <div className="agency-actions">
                            <button className="btn accept-btn" onClick={() => handleAccept(agency._id)}>Accept</button>
                            <button className="btn reject-btn" onClick={() => handleReject(agency._id)}>Reject</button>
                        </div>
                    </li>
                ))}
            </ul>
            
        </div>
        <Footer></Footer>
      </>
    );
};

export default AgencyVerification;
