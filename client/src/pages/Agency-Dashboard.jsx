import { AgencyNavbar } from "../components/AgencyNavbar";
import { useAgencyAuth } from "../store/agency_auth";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Agency-Dashboard.css';
import dashboardImg from './img1.webp';

const AgencyDashboard = () => {
    const { agency } = useAgencyAuth(); // Fetch agency data from context

    // Check if agency data is available
    if (!agency) {
        return <h1>No Page Available</h1>; // Or any other loading state
    }

    return (
        <>
            <AgencyNavbar />
            <div className="Agency-Dashboard-container">
                <div className="Agency-Dashboard-img">
                    <img src={dashboardImg} alt="Dashboard"  />
                </div>
                <div className="Agency-Dashboard-text">
                    <h1>Hello, {agency.companyname} welcome to Unitantra!</h1>
                    <h1>Country: {agency.country}</h1>
                    <h1>Agency Id: {agency._id}</h1>
<br></br>
                    {/* Buttons with Links */}
                    <div className="Agency-Dashboard-buttons">
                        <Link to="/agencyapplications">
                            <button className="dashboard-btn">View Applications</button>
                        </Link>
                        <Link to="/agencyaddstudent">
                            <button className="dashboard-btn">Add Student</button>
                        </Link>

                        <Link to="/agencystudents">
                            <button className="dashboard-btn">All Student</button>
                        </Link>
                       
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgencyDashboard;
