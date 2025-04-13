import { useState, useEffect } from "react";
import { useAgencyAuth } from "../store/agency_auth";
import "./Profile.css";
import profileImg from "./profileee.jpg";
import { toast } from 'react-toastify';
import { AgencyNavbar } from "../components/AgencyNavbar";
const defaultProfileFormData = {
  companyname: "",
  email: "",
  phone: "",
};

export const AgencyProfile = () => {
  const [profile, setProfile] = useState(defaultProfileFormData);
  const { agency } = useAgencyAuth(); // Fetch agency data from context
  
  useEffect(() => {
    if (agency) {
      setProfile({
        companyname: agency.companyname,
        email: agency.email,
        phone: agency.phone,
      });
    }
  }, [agency]); // Dependency array should include `agency`

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (agency) {
        const response = await fetch("http://localhost:5000/api/agency_profile", {
          method: "POST",
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify(profile),
        });

        if (response.ok) {
          setProfile(defaultProfileFormData);
          const data = await response.json();
          console.log(data);
          toast.success('Message sent successfully');
        } else {
          toast.error('Failed to update profile');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred');
    }
  };

  return (<>
  <AgencyNavbar></AgencyNavbar>

    <div className="profile-container">
      <br />
      <br />
      <h2 className="Profile-h2"></h2>
      <img src={profileImg} alt="Profile" style={{ width: "290px", paddingLeft: "150px" }} />
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <br /><br />
          <h1 style={{ color: '#001D2B', textAlign: 'center' }}>Hello, {profile.companyname}</h1>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" autoComplete='off' value={profile.email} onChange={handleInput} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="number" name="phone" id="phone" autoComplete='off' value={profile.phone} onChange={handleInput} required />
        </div>
        <button type="submit">Add more information</button>
      </form>
    </div>  </>
  );
};
