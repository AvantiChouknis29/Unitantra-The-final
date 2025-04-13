import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './AdminUsers.css';
import { fetchUserApplications } from './UserApplications';

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const { authorizationToken } = useAuth();
    const navigate = useNavigate(); // Initialize useNavigate

    const getAllUsersData = async () => {
        try {
            const response = await fetch("https://unitantra-backend.onrender.com/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            const data = await response.json();
            console.log('API response:', data);

            if (data && Array.isArray(data.users)) {
                setUsers(data.users);
            } else {
                console.error('Expected users array, but got:', data);
            }
        } catch (error) {
            console.log('Error fetching users:', error);
        }
    };

    // Delete user function
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`https://unitantra-backend.onrender.com/api/admin/users/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });
            const data = await response.json();
            console.log(`User deleted: ${data}`);

            if (response.ok) {
                getAllUsersData();
            }
        } catch (error) {
            console.error(error);
        }
    };

    // More Info button handler
    const handleMoreInfo = (email) => {
        navigate(`/admin/users/applications/${email}`); // Navigate to the applications page
    };

    useEffect(() => {
        getAllUsersData();
    }, [authorizationToken]);

    return (
        <>
            <section className="admin-users-custom-section">
                <div className="admin-users-custom-container">
                    <h1>Admin User Data</h1>
                </div>
                <div className="admin-users-custom-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Verified Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>More info</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((curUser, index) => (
                                <tr key={index}>
                                    <td>{curUser.username}</td>
                                    <td>{curUser.email}</td>
                                    <td>{curUser.phone}</td>
                                    <td>
                                        <button className="admin-users-custom-button">
                                            <Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link>
                                        </button>
                                    </td>
                                    <td>
                                        <button className="admin-users-custom-button delete" onClick={() => deleteUser(curUser._id)}>Delete</button>
                                    </td>
                                    <td>
                                        <button className="admin-users-custom-button info" onClick={() => handleMoreInfo(curUser.email)}>
                                            More Info
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};
