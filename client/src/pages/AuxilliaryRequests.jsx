import React, { useState } from 'react';
import './AuxiliaryRequests.css'; // Import the CSS file
import FlightTicket from './FlightTicketFetch';
import Accomodation from './AccomodationFetch';
import IELTS from './IELTSRequestsFetch';
import CounsellingRequestsFetch from './CounsellingRequestsFetch'; // Import for Counselling
import QueriesFetch from './QueriesFetch'; // Import for Queries

const AuxiliaryRequests = () => {
    const [selectedService, setSelectedService] = useState(null);

    const handleFlightTicketClick = () => {
        setSelectedService('flightTicket');
    };

    const handleAccommodationClick = () => {
        setSelectedService('accommodation');
    };

    const handleIeltsClick = () => {
        setSelectedService('ielts');
    };

    const handleCounselingClick = () => {
        setSelectedService('counseling');
    };

    const handleQueriesClick = () => {
        setSelectedService('queries');
    };

    const renderServiceDetails = () => {
        switch (selectedService) {
            case 'flightTicket':
                return <FlightTicket />;
            case 'accommodation':
                return <Accomodation />;
            case 'ielts':
                return <IELTS />;
            case 'counseling':
                return <CounsellingRequestsFetch />;
            case 'queries':
                return <QueriesFetch />; // Render the Queries fetch component
            default:
                return null;
        }
    };

    return (
        <div className="aux-requests-container">
            <br></br><br></br><br></br>
            <h2 className="aux-requests-title">Our Services</h2>
            <div className="aux-requests-button-group">
                <button className="aux-requests-button" onClick={handleFlightTicketClick}>Flight Ticket</button>
                <button className="aux-requests-button" onClick={handleAccommodationClick}>Accommodation</button>
                <button className="aux-requests-button" onClick={handleIeltsClick}>IELTS/PTE</button>
                <button className="aux-requests-button" onClick={handleCounselingClick}>Counseling</button>
                <button className="aux-requests-button" onClick={handleQueriesClick}>Queries</button>
            </div>
            <div className="service-details">
                {renderServiceDetails()}
            </div>
        </div>
    );
};

export default AuxiliaryRequests;
