import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Services } from './pages/Services';
import { Navbar } from './components/Navbar';
import { Register } from './pages/Register';
import { Search } from './pages/Search';
import { Logout } from './pages/Logout';
import { Error } from './pages/Error';
import { Wallet } from './pages/Wallet';
import ApplicationStatus from './pages/ApplicationStatus'; // Corrected import
import { Cart } from './pages/Cart';
import AirTicketForm from './pages/AirTicket';
import AccommodationForm from './pages/Accomodation';
import DashboardPg from './pages/DashboardPg';
import IELTSForm from './pages/IELTS'
import CounsellingForm from './pages/Counselling'
import QueriesForm from './pages/Queries'
import AgencyDashboard from './pages/Agency-Dashboard';
import AgencyRegistration from './pages/AgencyRegistration'
import AgencyLogin from './pages/AgencyLogin'
import { AgencyLogout } from './pages/Agency-logout';
import {AgencyProfile} from './pages/Agency-Profile'
import {AgencySearch} from './pages/Agency-Search'
import {AgencyAddStudentForm} from './pages/Agency-AddStudent'
import AgencyApplications from './pages/AgencyApplications'
import { AdminLayout } from './components/layouts/Admin-Layout';
import { AdminAgency } from './pages/Admin-Agency';
import { AdminUsers } from './pages/Admin-Users';
import { Footer } from './components/Footer/Footer';
import AdminUpdate from './pages/Admin-Update'
import { AdminAgencyUpdate } from './pages/AdminAgencyUpdate';
import AuxiliaryRequests from './pages/AuxilliaryRequests';
import FlightTicketDetails from './pages/FlightTicketDetails';
import AccomodationDetails from './pages/AccomodationDetails';
import IELTSDetails from './pages/IELTSDetails';
import CounsellingDetails from './pages/CounsellingDetails';
import QueriesDetails from './pages/QueriesDetails';
import AgencyVerification from './pages/AgencyVerification'
import UserApplication from './pages/UserApplications'
import AdminAgencyApplication from './pages/AdminAgencyApplications'
import {AdminLogout} from './pages/AdminLogout';
import StudentApplied from './pages/StudentApplied';
import AdminHome from './pages/Admin-Home';
import StudentCards from './pages/StudentCards'
const App = () => {
  return (
    <>
      <BrowserRouter>
       
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/applicationstatus" element={<ApplicationStatus />} />
          <Route path="*" element={<Error />} />
          <Route path="/flightTicket" element={<AirTicketForm />} />
          <Route path="/accommodation" element={<AccommodationForm />} />
          <Route path="/dashboard" element={<DashboardPg />} />
          <Route path="/ielts" element={<IELTSForm />} />
          <Route path="/counselling" element={<CounsellingForm />} />
          <Route path="/queries" element={<QueriesForm />} />
          
          <Route path="/applied" element={<StudentApplied />} />
        
          <Route path="/agencydashboard" element={<AgencyDashboard />} />
          <Route path="/agencyregistration" element={<AgencyRegistration />} />
        
          <Route path="/agencylogin" element={<AgencyLogin />} />
          <Route path="/agencylogout" element={<AgencyLogout/>} />
          <Route path="/agencyprofile" element={<AgencyProfile/>} />
          <Route path="/agencysearch" element={<AgencySearch/>} />
         
          <Route path="/agencyaddstudent" element={<AgencyAddStudentForm/>} />
             <Route path="/agencyapplications" element={<AgencyApplications/>}/>
             <Route path="/agencystudents" element={<StudentCards/>}/>
             
            
             <Route path='/admin' element={<AdminLayout />}>
                    <Route path="users" element={<AdminUsers />} />
                    <Route path="users/:id/edit" element={<AdminUpdate />} />
                    <Route path="agency/:id/edit" element={<AdminAgencyUpdate />} />
                    <Route path="home" element={<AdminHome/>} />
                 
                    <Route path="agency" element={<AdminAgency />} />
                    <Route path="user/requests" element={<AuxiliaryRequests/>} />
                    <Route path="ticket-details" element={<FlightTicketDetails />} />
                    <Route path="accomodation-details" element={<AccomodationDetails />} />
                    <Route path="ielts-details" element={<IELTSDetails />} />
                    <Route path="counselling-details" element={<CounsellingDetails />} />
                    
                    <Route path="queries-details" element={<QueriesDetails />} />
                    <Route path="agency/verification" element={< AgencyVerification />} />
                  

                    <Route path="users/applications/:email" element={<UserApplication />} />
                  
                     <Route path="agency/applications/:agencyId" element={<AdminAgencyApplication />} />
                   
                    <Route path="logout" element={<AdminLogout />} />
                    
                </Route>
        </Routes>

       
      </BrowserRouter>
    </>
  );
};

export default App;
