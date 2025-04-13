// AdminUpdate.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

const AdminUpdate = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    const { authorizationToken } = useAuth();

    // Get User data
    const getSingleUserData = async (id) => {
        try {
            const response = await fetch(`https://unitantra-backend.onrender.com/api/admin/users/${id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            const userData = await response.json();
            console.log(`User data:`, userData);
            setData(userData);
        } catch (error) {
            console.error("Error fetching user data:", error);
            toast.error("Failed to fetch user data");
        }
    };

    useEffect(() => {
        getSingleUserData(params.id);
    }, [params.id]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://unitantra-backend.onrender.com/api/admin/users/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: authorizationToken,
                    'Content-Type': 'application/json', // Make sure to specify the content type
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const updatedData = await response.json();
                console.log(`User updated:`, updatedData);
                toast.success("Updated Successfully");
            } else {
                throw new Error("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Not Updated");
        }
    };

    return (
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Update Data</h1>
            </div>
            <div className="container grid grid-two-cols">
                {/* Add any additional content here if necessary */}
            </div>

            <section className="section-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            autoComplete="off"
                            value={data.username}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="off"
                            value={data.email}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            autoComplete="off"
                            value={data.phone}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </section>
        </section>
    );
};

export default AdminUpdate;
