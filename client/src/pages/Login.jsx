import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImage from './image2.jpg';
//import './Register.css';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
const URL = 'http://localhost:5000/api/auth/login';
import { Navbar } from '../components/Navbar';
export const Login = () => {
    const [user, setUser] = useState({
        phone: '',
        password: '',
    });

    const navigate = useNavigate();
    const {storeTokenInLS}=useAuth()
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
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const res_data = await response.json(); // Read response body once
    
            if (response.ok) {
                 
                console.log("Response from server", res_data);
                storeTokenInLS(res_data.token);
                setUser({ phone: '', password: '' });
                navigate('/dashboard');
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message)
              console.log(res_data.message)
                     }
        } catch (error) {
            alert('Error: ' + error.message);
            
        }
    };
    
    

    return (
        <section>
            <main>
                <div className="section-registration">
               
                    <div className="registration-image">
                        <img src={LoginImage} alt="Registration" style={{ width: '400px' }} />
                    </div>
                    <div className="registration-form">
                    <Navbar />
                        <h2>Login Here</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="Email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    autoComplete="off"
                                    value={user.email}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    autoComplete="off"
                                    value={user.password}
                                    onChange={handleInput}
                                />
                            </div>
                            <h5 style={{ textAlign: 'center' }}>
                                New here? <a href="/register">Signup for free</a>
                            </h5>
                            <br />
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    );
};
