import React from 'react';
import './DashboardPg.css'; // Import your CSS file
import { Sidebar } from './Sidebar';
import bg from './c1.jpg';
import bg2 from './ssl.png'
import bg3 from './cc.png'

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { Navbar } from '../components/Navbar';

function DashboardPg() {
 

  return (
     
    <div className="dashboard-container">
      
      <Sidebar />
      
      <div className="dashboard-content">
      
      <Navbar />
        {/* Add Carousel here */}
        <Carousel 
          autoPlay 
          interval={1500} 
          infiniteLoop 
          showThumbs={false} 
          showStatus={false} 
          showIndicators={false}
          showArrows={false}
        >
          <div>
            <img src={bg} alt="Slide 1" style={{height:'500px'}}/>
          </div>
         
          <div>
            <img src={bg3} alt="Slide 2" style={{height:'550px'}}/>
          </div>
          <div>
            <img src={bg2} alt="Slide 2" style={{height:'550px'}}/>
          </div>
        </Carousel>
        
        <div className="cards-container">
          <div className="card1">
            <h2>Shortlisted</h2>
            <p>Check out shortlisted courses</p>
            <a href="https://unitantra-the-final-frontend.onrender.com/applicationstatus">Click here</a>
          </div>
          <div className="card">
            <h2>Applied</h2>
            <p>Courses you have applied to</p>
            <a href="https://unitantra-the-final-frontend.onrender.com/applied">Click here</a>
          </div>
         
        </div>
      </div>
    </div>
  );
}

export default DashboardPg;
