import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

const fetchAgencyApplications = async (agencyId, authorizationToken) => {
    try {
        const response = await fetch(
            `https://unitantra-backend.onrender.com/api/admin/agency/applications/${agencyId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
            }
        );

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || "Error fetching applications");
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Error fetching agency applications:", error);
        return [];
    }
};

const updateStatus = async (appId, newStatus, authorizationToken) => {
    try {
        const response = await fetch(
            `https://unitantra-backend.onrender.com/api/admin/agency/application/status/${appId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken,
                },
                body: JSON.stringify({ mystatus: newStatus }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update status");
        }

        const updatedApp = await response.json();
        return updatedApp;
    } catch (error) {
        console.error("❌ Error updating status:", error);
        alert("❌ Error updating status! Please try again.");
        return null;
    }
};


const AdminAgencyApplications = () => {
    const { agencyId } = useParams();
    const { authorizationToken } = useAuth();
    const [applications, setApplications] = useState([]);
    const [statusUpdates, setStatusUpdates] = useState({}); // Store input values per application
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!agencyId) {
            setError("Agency ID is missing in the URL.");
            setLoading(false);
            return;
        }

        const fetchApplications = async () => {
            try {
                const data = await fetchAgencyApplications(agencyId, authorizationToken);
                setApplications(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [agencyId, authorizationToken]);

    const handleStatusChange = async (appId) => {
        const newStatus = statusUpdates[appId];
        if (!newStatus) {
            alert("Please enter a status.");
            return;
        }
    
        const updatedApp = await updateStatus(appId, newStatus, authorizationToken);
        if (updatedApp) {
            setApplications((prev) =>
                prev.map((app) =>
                    app._id === appId
                        ? { ...app, mystatus: updatedApp.updatedApplication.mystatus }
                        : app
                )
            );
            setStatusUpdates((prev) => ({ ...prev, [appId]: "" }));
            alert("✅ Status updated!");
        }
    };
    
    return (
        <div className="agency-applications-container">
            <h1 className="agency-applications-title">Applications for Agency ID: {agencyId}</h1>

            {loading ? (
                <p className="loading-text">Loading...</p>
            ) : error ? (
                <p className="error-text">Error: {error}</p>
            ) : applications.length > 0 ? (
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>University</th>
                            <th>Course</th>
                            <th>Link</th>
                            <th>User UID</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((app) => (
                            <tr key={app._id}>
                                <td>{app.university}</td>
                                <td>{app.course}</td>
                                <td>
                                    <a href={app.link} target="_blank" rel="noopener noreferrer">
                                        View
                                    </a>
                                </td>
                                <td>{app.userUID}</td>
                                <td>
                                    <input
                                        type="text"
                                        value={statusUpdates[app._id] ?? app.mystatus ?? ""}
                                        onChange={(e) => {
                                            const updatedValue = e.target.value;
                                            setStatusUpdates((prev) => ({
                                                ...prev,
                                                [app._id]: updatedValue,
                                            }));
                                        }}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleStatusChange(app._id)}>
                                        Update Status
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="no-data-text">No applications found for this agency.</p>
            )}
        </div>
    );
};

export default AdminAgencyApplications;
