


import React, { useState } from 'react';
import registrationImage from './image2.jpg'; // Import your registration image here
import "./Register.css";
import { useNavigate } from 'react-router-dom';
import { useAgencyAuth } from "../store/agency_auth"
import { toast } from 'react-toastify';
//import { AgencyNavbar } from '../components/AgencyNavbar';


 const AgencyLogin= () => {
    const [agency, setAgency] = useState({
        
        email: "",
        password: "",
    });
   const navigate = useNavigate();
    const { storeTokenInLS } = useAgencyAuth();

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
            const response=await fetch(`https://unitantra-backend.onrender.com/api/agency_login`,{
                method:"POST",
                headers:{
                    'Content-Type':"application/json",

                },
                body:JSON.stringify(agency)
            })

            if(response.ok){
                const res_data_agency=await response.json();
                console.log("response from server",res_data_agency)
                //storing at localhost
                storeTokenInLS(res_data_agency.token)
            
                toast.success("Welcome,to Unitantra!");
                setAgency({
                    email: "",
                    password: "",})
    
                    navigate("/agencydashboard")
            }else{
                toast.error("Invalid Credentials");
            }

        }catch(error){
            console.log(error)
            toast.error("Failured to login,Please reach to authorities or try again later");
              
        }
        
    };

    return (
        <section>
            <main>
                <div className="section-registration">
                    
                    <div className="registration-image">
                    <br></br>  <br></br>  <br></br>
                        <img src={registrationImage} alt="Registration" style={{ width: "600px" }} />
                    </div>
                    <div className="registration-form">
                    <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
                        <h2>Login as a Agent</h2>
                        <form onSubmit={handleSubmit}>
                           
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email address" required autoComplete="off" value={agency.email} onChange={handleInput} />
                            </div>
                            
                            
                            <div className="form-group">
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" placeholder="Enter your password" required autoComplete="off" value={agency.password} onChange={handleInput} />
                            </div>
                            <h5 style={{ textAlign: 'center' }}>
                                New here? <a href="/agencyregistration">Signup for free</a>
                            </h5>
                            <br></br>
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    );
};
export default AgencyLogin;
