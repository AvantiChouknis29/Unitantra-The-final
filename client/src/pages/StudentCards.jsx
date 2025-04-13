// StudentCards.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentCards.css';
import { useAgencyAuth } from '../store/agency_auth';

const StudentCards = () => {
  const { agency } = useAgencyAuth(); // Fetch agency data from context
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!agency || !agency._id) return;

    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${agency._id}`);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [agency]);

  if (!agency) return <h1>No Page Available</h1>;
  if (loading) return <p className="loading">Loading students...</p>;

  return (
    <div className="student-card-container">
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        students.map(student => (
          <div key={student._id} className="student-card">
            <h2>{student.name}</h2>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Phone:</strong> {student.phone}</p>
            <p><strong>UID:</strong> {student.UID}</p>
            <p><strong>Country:</strong> {student.country}</p>
            <p><strong>City:</strong> {student.city}</p>
            <p><strong>Agency ID:</strong> {student.AgencyId}</p>
            <a href={student.link} target="_blank" rel="noopener noreferrer" className="form-link">
              View Form
            </a>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentCards;
