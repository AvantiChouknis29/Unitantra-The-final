import { useState } from "react";
import { useAuth } from "../store/auth";
import "./Profile.css";
import profileImg from "./profileee.jpg";
import { toast } from 'react-toastify';
import { Navbar } from "../components/Navbar";
const defaultProfileFormData = {

  username: "",
  email: "",
  phone: "",
};

export const Profile = () => {
  
 
  const [profile, setProfile] = useState(defaultProfileFormData);
  const [userData, setUserData] = useState(true);
  const { user } = useAuth();

  if (userData && user) {
    toast.info("Please upload the required Documents tap the button below")
        
    setProfile({
      username: user.username,
      email: user.email,
      phone: user.phone,
    });
    setUserData(false);
  }

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
      if (user) {
        const response = await fetch("https://unitantra-backend.onrender.com/api/form/profile", {
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
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  return (<><Navbar></Navbar>
    <div className="profile-container">
      
      <br />
      <br />
      <h2 className="Profile-h2"></h2>
      
      <img src={profileImg} alt="Registration" style={{ width: "290px", paddingLeft: "150px" }} />
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <br></br><br></br>
          <h1 style={{color:'#001D2B',textAlign:'center'}}>Hello, {profile.username}</h1>
             </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" autoComplete='off' value={profile.email} onChange={handleInput} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="number" name="phone" id="phone" autoComplete='off' value={profile.phone} onChange={handleInput} required />
        </div>
        
      </form>
      {user && (
        <a className="profile" href="https://forms.gle/nZgZJJWteJCrrpWp7" target="_blank" rel="noopener noreferrer"  style={{
          display: 'inline-block',
          padding: '10px 30px',
          backgroundColor: '#007bff',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '5px',
          transition: 'background-color 0.3s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
          
        }}>
         Tap to upload documents
        </a>
      )}
    </div></>
  );
};
