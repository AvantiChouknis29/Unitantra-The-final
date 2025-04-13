import { useEffect, useState } from "react"; 
import { useAuth } from "../store/auth";
import './AdminUsers.css';
import { Link, useNavigate } from 'react-router-dom';

export const AdminAgency = () => {
    const [agencies, setAgencies] = useState([]);
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();

    // Fetch all agencies
    const getAllAgencyData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/admin/agency", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            if (!response.ok) throw new Error(`Error fetching agencies: ${response.statusText}`);

            const data = await response.json();
            console.log('API response:', data);

            if (data && Array.isArray(data.agency)) {
                setAgencies(data.agency);
            } else {
                console.error('Expected agency array, but got:', data);
            }
        } catch (error) {
            console.log('Error fetching agencies:', error);
        }
    };

    // Delete agency
    const deleteAgency = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/agency/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            const data = await response.json();
            console.log(`Agency after delete:`, data);

            if (response.ok) {
                getAllAgencyData(); // Refresh agency list after deletion
            } else {
                throw new Error(`Error deleting agency: ${data.message}`);
            }
        } catch (error) {
            console.log('Error deleting agency:', error);
        }
    };

   const handleMoreAgencyInfo = (agency) => {
        if (!agency || !agency._id) {
            console.error("Invalid agency data:", agency);
            return;
        }
    
        console.log("Navigating to:", `/admin/agency/applications/${agency._id}`);
        navigate(`/admin/agency/applications/${agency._id}`);
    };
    

    useEffect(() => {
        getAllAgencyData();
    }, [authorizationToken]);

    return (
        <section className="admin-users-custom-section">
            <div className="admin-users-custom-container">
                <h1>Admin Agency Data</h1>
            </div>
            <div className="admin-users-custom-table">
                <table>
                    <thead>
                        <tr>
                            <th>Agency Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Update</th>
                            <th>Delete</th>
                            <th>More Info</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agencies.map((curAgency, index) => (
                            <tr key={index}>
                                <td>{curAgency._id}</td>
                                <td>{curAgency.companyname}</td>
                                <td>{curAgency.email}</td>
                                <td>{curAgency.phone}</td>
                                <td>
                                    <Link to={`/admin/agency/${curAgency._id}/edit`} className="admin-users-custom-button">
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <button className="admin-users-custom-button delete" onClick={() => deleteAgency(curAgency._id)}>
                                        Delete
                                    </button>
                                </td>
                                 <td>
                                    <button className="admin-users-custom-button" onClick={() => handleMoreAgencyInfo(curAgency)}>
                                        More Info
                                    </button>
                                </td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};
