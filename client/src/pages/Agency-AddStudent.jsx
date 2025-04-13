import React, { useState } from 'react';
import axios from 'axios';
import './Agency-add-Students.css';
import { AgencyNavbar } from '../components/AgencyNavbar';
import { useAgencyAuth } from "../store/agency_auth";

export const AgencyAddStudentForm = () => {
  const { agency } = useAgencyAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    country: '',
    city: '',
    UID: '',
    link: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add AgencyId automatically from agency context
    const submissionData = { ...formData, AgencyId: agency._id };

    try {
      const response = await axios.post('https://unitantra-backend.onrender.com/api/add-a-student-agency', submissionData);
      if (response.status === 200) {
        alert('Student added successfully!');
        setFormData({
          name: '',
          phone: '',
          email: '',
          country: '',
          city: '',
          UID: '',
          link: ''
        });
      }
    } catch (error) {
      console.error('There was an error adding the student!', error);
      alert('Failed to add student!');
    }
  };

  if (!agency) {
    return <h1>No Page Available</h1>; // Loading or error state for no agency
  }

  return (
    <>
      <AgencyNavbar />
      <br />
      <h2 className="H2 heading" style={{ textAlign: 'center', color: '#2e78b7' }}>
        Hello, {agency.companyname}, please fill the form to add a student
      </h2>
      <div className="formapply">
        <form onSubmit={handleSubmit}>
          <div className="First">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>UID:</label>
            <input
              type="text"
              name="UID"
              value={formData.UID}
              onChange={handleChange}
              required
            />
          </div>

          {/* Remove the AgencyId input field */}
          <div>
            <label>Paste link to the google form:</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Add Student</button>
        </form>
        
        {/* Google Drive link, moved outside the form */}
        <a href='https://forms.gle/m7ZrHnPSsuq4hXrw7' style={{ textAlign: 'center' }}>Link to drive</a>
        <br /><br />
      </div>
    </>
  );
};
