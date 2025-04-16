/*import React from 'react';
import './Home.css';
import CounsellingImage from './image9.avif'; // Import your registration image here
import AssesmentImage from './image10.jpg'; // Import your registration image here
import TeachingImage from './image11.jpg'; // Import your registration image here
import ApplicationImage from './image7.jpg'; // Import your registration image here
import VisaImage from './image8.avif'; // Import your registration image here

import AustraliaVideo from './Australia.mp4'; // Import your registration image here

export const Home = () => {
  return (
    <div className="container">
      <div className="section">
        <div className="stats">
          <div className="stat">
            <h2>1,800</h2>
            <p>UNIVERSITIES</p>
          </div>
          <div className="stat">
            <h2>25</h2>
            <p>COUNTRIES</p>
          </div>
          <div className="stat">
            <h2>4</h2>
            <p>BRANCHES</p>
          </div>
          <div className="stat">
            <h2>100%</h2>
            <p>ACCEPTANCE</p>
          </div>
        </div>
        <div className="advantage">
          <h2>The Unitantra Advantage</h2>
          <p>Our Simple Yet Comprehensive 5-Step Counselling Process is Sure to Delight You.</p>
          <div className="steps">
            <div className="step">
              <h3>Step 1</h3>
              <img src={CounsellingImage} alt="" style={{width:"250px"}}></img>
              <p>Comprehensive Counselling</p>
              <p>Understanding You and Your Needs.</p>
            </div>
            <div className="step">
              <h3>Step 2</h3>
              <img src={AssesmentImage} alt="" style={{width:"250px"}}></img>
             
              <p>Assessment of Student Profile</p>
              <p>Identifying Country, University and Course.</p>
            </div>
            <div className="step">
              <h3>Step 3</h3>
              <img src={TeachingImage} alt="" style={{width:"250px"}}></img>
             
              <p>Test Booking & Coaching</p>
              <p>IELTS, PTE, TOEFL, GRE and GMAT Coaching and Test Booking.</p>
            </div>
            <div className="step">
              <h3>Step 4</h3>
              <img src={ApplicationImage} alt="" style={{width:"250px"}}></img>
             
              <p>Lodging Your Application</p>
              <p>We now liaise with the authorities on your behalf.</p>
            </div>
            <div className="step">
              <h3>Step 5</h3>
              <img src={VisaImage} alt="" style={{width:"250px"}}></img>
             
              <p>Visa & Pre-Departure</p>
              <p>We support you with visa, pre-departure and post arrival services.</p>
            </div>
          </div>
        </div>
        <div className="destinations">
          <h2>Explore Destinations to Study</h2>
          <div className="advantage">
          <h2></h2>
          <div className="steps">
            <div className="step">
             <video width="350" height="300" controls autoPlay muted>
                <source src={AustraliaVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p>Australia</p>
              <p>Australia offers world-class universities renowned for their academic excellence and research output. International students benefit from a supportive learning environment and diverse range of programs tailored to their interests. </p>
            </div>
            <div className="step">
              <h3>Step 2</h3>
              <p>Assessment of Student Profile</p>
              <p>Identifying Country, University and Course.</p>
            </div>
            <div className="step">
              <h3>Step 3</h3>
              <p>Test Booking & Coaching</p>
              <p>IELTS, PTE, TOEFL, GRE and GMAT Coaching and Test Booking.</p>
            </div>
            <div className="step">
              <h3>Step 4</h3>
              <p>Lodging Your Application</p>
              <p>We now liaise with the authorities on your behalf.</p>
            </div>
          </div>
        </div>
        </div>
        <a href="./login" className='btn1'>Login/Signup as a student</a>
      </div>
    </div>
  );
}*/

import './Home.css';
import Hero from './hero1.jpg';
import about from './about.png' 
import home from './Home.png'
import story from './Story.png'
import img from './Studentagency.png'
import student from './ss.webp'
import partner from './partner.avif'
import background from './background.webp'
export const Home = () => {
  return (
    <div className="unitantra-home">
      {/* Header Section */}
      <header className="unitantra-header">
        <div className="header-container">
          <div className="unitantra-logo">Unitantra</div>
          <nav className="header-navigation">
            <ul className="navigation-list">
             </ul>
          </nav>
          <div className="header-actions">
            <a href="/login" className="action-button student-login">Student Login</a>
            <a href="/agencylogin" className="action-button agency-login">Agency Login</a>
          </div>
        </div>
      </header>

      <main className="hero">
      <div className="image-container">
<br></br><br></br><br></br><br></br>
  <div className="">
    <br></br>
   <h1 style={{'color':'#0033A0'}}>Unleash Your Potential By Exploring Variety of Programs Worldwide With Unitantra!</h1>
   <br></br>
 
   <h2 style={{'color':'#205781'}}>5+ countries • 2K+ universities • 89K+ courses • Relevant Services and more </h2>
   <img src={background} alt="about img" className="feature-image" style={{width:'900px'}} />
  <br></br>
    <a href="/search">
      <button className="image-button">Explore Programs</button>
    </a>
     </div>
  
</div>
<br></br><br></br><br></br><br></br><br></br><br></br>

  
 <div className='about-section'>
    <h2 className="about-title" style={{'color':'#0033A0'}}>Why Choose Unitantra?</h2>
 <br></br>  <h3 className="about-description">At Unitantra, we combine years of expertise with personalized solutions to help you achieve your global education dreams. Whether it's finding the right university or securing scholarships, we are committed to opening doors to top international institutions. From application submission to visa assistance and pre-departure guidance, we provide a comprehensive suite of services to ensure your success. </h3>
   </div>
   <br></br> <br></br> <br></br> <br></br>
   <h2 className="about-title" style={{'color':'#0033A0'}}>Join us as a Student or Partner!</h2>

<div className='about-section header-actions'>
    
   <div className="image-container">
  <img src={student} alt="about img" className="student-image" />

  <br>
  </br> <br>
  </br>
  <a href="/login" className="action-button agency-login">Student Login</a>
  <br>
  </br> <br>
  </br> <br>
  </br>
 </div>
 <div className="image-container">
  <img src={partner} alt="about img" className="student-image" />

  <br>
  </br> <br>
  </br>
  <a href="/login" className="action-button agency-login">Agency Login</a>
  <br>
  </br> <br>
  </br> <br>
  </br>
 </div>
   </div>
   </main>
  

    <div className='footer'>
      <br></br><br></br>
    © {new Date().getFullYear()} Unitantra. All rights reserved.
    <br></br><br></br><br></br>
    </div>
   
    </div>
  );
}
