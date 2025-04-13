import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export const AdminAgencyUpdate = () => {
    const [data, setData] = useState({
        companyname: "",
        email: "",
        phone: "",
    });

    const params = useParams();
    const { authorizationToken } = useAuth();

    // Fetch single agency data
    const getSingleAgencyData = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/admin/agency/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            if (!response.ok) {
                throw new Error("Failed to fetch agency data");
            }

            const agencyData = await response.json();
            console.log(`Agency data:`, agencyData);
            setData(agencyData);
        } catch (error) {
            console.error("Error fetching agency data:", error);
            toast.error("Failed to fetch agency data");
        }
    };

    // Fetch the data when the component is mounted
    useEffect(() => {
        getSingleAgencyData();
    }, [params.id]);

    // Handle input changes
    const handleInput = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/admin/agency/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    Authorization: authorizationToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data) // Use 'data' state for form values
            });

            if (response.ok) {
                toast.success("Updated Successfully");
            } else {
                toast.error("Update Failed");
            }

            const updatedData = await response.json();
            console.log(`Agency updated:`, updatedData);

            // Optionally, refetch or reset form here if needed
        } catch (error) {
            console.error("Error updating agency data:", error);
            toast.error("An error occurred while updating.");
        }
    };

    return (
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Update Agency Data</h1>
            </div>

            <section className="section-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="companyname">Company Name</label>
                        <input
                            type="text"
                            name="companyname"
                            id="companyname"
                            value={data.companyname}
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

export default AdminAgencyUpdate;
