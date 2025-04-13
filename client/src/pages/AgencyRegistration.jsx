


import React, { useState } from 'react';
import registrationImage from './image1.jpg'; // Import your registration image here
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { useAgencyAuth } from "../store/agency_auth"
import { toast } from 'react-toastify';
//import { AgencyNavbar } from '../components/AgencyNavbar';

 const AgencyRegistration= () => {
    const [agency, setAgency] = useState({
        companyname: "",
        email: "",
        phone: "",
        country: "",
        city:"",
        address:"",
        designation:"",
        password: "",
    });
    const navigate = useNavigate();
    const {storeTokenInLS}=useAgencyAuth();
   // navigate('/agencylogin');
   // const { storeTokenInLS } = useAuth();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setAgency({
            ...agency,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const response=await fetch(`https://unitantra-backend.onrender.com/api/agency_register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify(agency),
        })
        
        console.log(response)
       
        if(response.ok){
            const res_data_agency=await response.json();
            console.log("response from server",res_data_agency)
            //stored the token in localhost
            storeTokenInLS(res_data_agency.token)
              
            toast.success("Welcome, now we will verify your profile and get back to you in 48 hours");
            setAgency({companyname: "",
                email: "",
                phone: "",
                country: "",
                city:"",
                address:"",
                designation:"",
                password: "",})

                navigate("/agencylogin")
        } 
    }catch(error){
       console.log("agency registration failed",error) 
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
                       
                        <h2>Register as a Agent</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="companyname">Company Name:</label>
                                <input type="text" id="companyname" name="companyname" placeholder="Enter your company name" required autoComplete="off" value={agency.companyname} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email address" required autoComplete="off" value={agency.email} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <input type="text" id="phone" name="phone" placeholder="Enter your phone number" required autoComplete="off" value={agency.phone} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country">Country:</label>
                                <input type="text" id="country" name="country" placeholder="Enter your country" required autoComplete="off" value={agency.country} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City:</label>
                                <input type="text" id="city" name="city" placeholder="Enter your city" required autoComplete="off" value={agency.city} onChange={handleInput} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Address:</label>
                                <input type="text" id="address" name="address" placeholder="Enter your address" required autoComplete="off" value={agency.address} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="designation">Designation</label>
                                <input type="text" id="designation" name="designation" placeholder="Enter your designation" required autoComplete="off" value={agency.designation} onChange={handleInput} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" placeholder="Enter your password" required autoComplete="off" value={agency.password} onChange={handleInput} />
                            </div>
                            <button type="submit">Register</button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    );
};
export default AgencyRegistration;
