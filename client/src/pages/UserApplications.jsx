import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import './AuxilliaryServices.css';

export const fetchUserApplications = async (email, authorizationToken) => {
    try {
        const response = await fetch(`http://localhost:5000/api/admin/applications/${email}`, {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error fetching applications: ${response.status} ${errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
};

const UserApplications = () => {
    const { email } = useParams();
    const { authorizationToken } = useAuth();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusInputs, setStatusInputs] = useState({});

    const handleStatusChange = (appId, value) => {
        setStatusInputs(prev => ({ ...prev, [appId]: value }));
    };

    const updateStatus = async (appId) => {
        const status = statusInputs[appId];

        if (!status) return alert("Please enter a status.");

        try {
            const response = await fetch(`http://localhost:5000/api/admin/user/application/status/${appId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ mystatus: status }),
            });

            if (!response.ok) throw new Error("Failed to update status");

            const updated = await response.json();
            alert("Status updated successfully!");

            // Refresh the application list
            const updatedApps = applications.map(app =>
                app._id === updated.updatedApplication._id
                    ? updated.updatedApplication
                    : app
            );
            setApplications(updatedApps);
        } catch (error) {
            console.error(error);
            alert("Error updating status.");
        }
    };

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const data = await fetchUserApplications(email, authorizationToken);
                setApplications(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [email, authorizationToken]);

    return (
        <div className="user-applications-container">
            <h1 className="user-applications-title">User Applications for {email}</h1>
            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : error ? (
                <p className="error-text">Error: {error}</p>
            ) : (
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>University</th>
                            <th>Course</th>
                            <th>Link</th>
                            <th>Current Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <tr key={app._id}>
                                    <td>{app.university}</td>
                                    <td>{app.course}</td>
                                    <td>
                                        <a href={app.link} target="_blank" rel="noopener noreferrer">
                                            View
                                        </a>
                                    </td>
                                    <td>{app.mystatus || "Not set"}</td>
                                    <td>
                                        <input
                                            type="text"
                                            placeholder="Enter new status"
                                            value={statusInputs[app._id] || ""}
                                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                            style={{ marginRight: "10px" }}
                                        />
                                        <button onClick={() => updateStatus(app._id)}>Update</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No applications found for this user.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserApplications;
