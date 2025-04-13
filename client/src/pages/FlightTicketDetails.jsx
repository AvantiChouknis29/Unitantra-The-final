import React from 'react';
import { useLocation } from 'react-router-dom';
import './AuxilliaryServices.css'; // Link the CSS file

const FlightTicketDetails = () => {
    const location = useLocation();
    const ticketData = location.state?.ticketData || [];

    return (
        <div className="flight-container">
            <h3 className="flight-title">Flight Ticket Details</h3>
            {ticketData.length === 0 ? (
                <p className="flight-no-data">No ticket data available.</p>
            ) : (
                ticketData.map((ticket) => (
                    <div key={ticket._id} className="flight-card">
                        <h4 className="flight-id">Ticket ID: {ticket._id}</h4>
                        <div className="flight-info">
                            <p><strong>Username:</strong> {ticket.username}</p>
                            <p><strong>Email:</strong> {ticket.email}</p>
                            <p><strong>Phone:</strong> {ticket.phone}</p>
                            <p><strong>Country:</strong> {ticket.country}</p>
                            <p><strong>From:</strong> {ticket.from}</p>
                            <p><strong>To:</strong> {ticket.to}</p>
                            <p><strong>Date:</strong> {ticket.date}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default FlightTicketDetails;
