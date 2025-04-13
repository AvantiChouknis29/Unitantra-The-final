import React, { useState } from 'react';
import registrationImage from './image1.jpg'; // Import your registration image here
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { Navbar } from '../components/Navbar';
export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        country: "",
        password: "",
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://unitantra-backend.onrender.com/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (response.ok) {
                const res_data = await response.json();
                storeTokenInLS(res_data.token);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    country: "",
                    password: "",
                });
                toast.success("Please Verify Email!");
            } else {
                const res_data = await response.json();
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.log("Error during registration:", error);
            toast.error("Registration failed. Please try again later.");
        }
    };

    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="registration-image">
                        <img src={registrationImage} alt="Registration" style={{ width: "600px" }} />
                    </div>
                    <div className="registration-form">
                        <Navbar></Navbar>
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" placeholder="Enter your username" required autoComplete="off" value={user.username} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email address" required autoComplete="off" value={user.email} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" placeholder="Enter your phone number" required autoComplete="off" value={user.phone} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country:</label>
                                <input type="text" id="country" name="country" placeholder="Enter country you are targeting" required autoComplete="off" value={user.country} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" placeholder="Enter your password" required autoComplete="off" value={user.password} onChange={handleInput} />
                            </div>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    );
};
