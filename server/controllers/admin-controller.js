const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const User=require('../model/user-model')
const Agency=require('../model/agency')
const Flight=require('../model/AirTicket')
const Accomodation = require('../model/Accomodation');
const IELTS=require('../model/ielts')
const Counselling=require('../model/counselling')
const Queries=require('../model/queries')
const { Application } = require('../controllers/application-controller');
const AgencyStudentApplication =require('../model/agency-students')
const AdminAgencyApplications=require('../model/agencyapplicationFetching-model')
const getAllUsers=async(req,res)=>{
    try{
     //   const users=await User.find()
        const users = await User.find({ verified: true },{password:0});
        if(!users || users.length===0){
            return res.status(404).json({message:"No user found"})
        }
        res.status(200).json({users})
    }catch(error){
        res.status(400).json("Internal Server Error")
    }

}



//agency
const getAllAgency=async(req,res)=>{
    try{
     //   const agency=await User.find()
        const agency = await Agency.find({ verifiedAgent: true },{password:0});
        if(!agency || agency.length===0){
            return res.status(404).json({message:"No user found"})
        }
        res.status(200).json({agency})
    }catch(error){
        res.status(400).json("Internal Server Error")
    }

}


//delete user
const deleteUserById=async(req,res)=>{
    try{
        const id=req.params.id;
        await User.deleteOne({_id:id});
        return res.status(200).json({message:"User Deleted Successfully"})
    }catch(error){
        next(error)
    }

}


//update
// controller.js
// controller.js
const getUsersById = async (req, res) => {
     try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching user:', error); // Log the error
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const updateUserById=async(req,res)=>{
    try{
        const id=req.params.id;
        const updateUserData=req.body;

        const updateUser=await User.updateOne({_id:id},{
            $set:updateUserData
        })
        return res.status(200).json(updateUser)
    }catch(error){
        next(error)
    }
}


//Agency delete logic
const deleteAgencyById = async (req, res) => {
    try {
        const id = req.params.id;
        await Agency.deleteOne({ _id: id });
        return res.status(200).json({ message: "Agency deleted successfully" });
    } catch (error) {
        console.error('Error deleting agency:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


//get agency data for updation
const  getAgencyById=async(req,res)=>{
    try {
        const id = req.params.id;
        const data = await Agency.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching user:', error); // Log the error
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateAgencyById=async(req,res)=>{
    try{
        const id=req.params.id
        const updateAgencyData=req.body;
        const updateAgency=await Agency.updateOne({_id:id},{
            $set:updateAgencyData
        })
        return res.status(200).json(updateAgency)

    }catch(error){
        next(error)
    }

}


//flight-ticket

const fliightTicketRequest=async(req,res)=>{
    try{
        const requests = await Flight.find();
        console.log(requests)

        if(!requests||requests.length===0){
            return res.status(404).json({message:"No Requests found"})
        }
    return res.status(200).json(requests)
    }catch(error){
        next(error)
    }
      
}

const accomodationRequest = async (req, res) => {
    try {
        const requests = await Accomodation.find();  // Ensure Accomodation model is being used
        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: "No requests found" });
        }
        return res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const IELTSRequest = async (req, res) => {
    try {
        const requests = await IELTS.find();  // Ensure Accomodation model is being used
        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: "No requests found" });
        }
        return res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const CounsellingRequest = async (req, res) => {
    try {
        const requests = await Counselling.find();  // Ensure Counselling model is being used
        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: "No requests found" });
        }
        return res.status(200).json(requests);
    } catch (error) {
        console.error("Error fetching counselling requests:", error);  // Log the error for debugging
        res.status(500).json({ message: "Internal Server Error", error: error.message });  // Provide error message for better debugging
    }
};


const queriesRequest = async (req, res) => {
    try {
        const requests = await Queries.find();  // Ensure Accomodation model is being used
        if (!requests || requests.length === 0) {
            return res.status(404).json({ message: "No requests found" });
        }
        return res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};





//router.get('/agencies', 
const fetchAllAgency=async (req, res) => {
    try {
        const agencies = await Agency.find();
        if (!agencies || agencies.length === 0) {
            return res.status(404).json({ message: "No agencies found" });
        }
        return res.status(200).json(agencies);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Accept an agency
//router.patch('/agencies/:id/accept', 
const acceptagency=async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAgency = await Agency.findByIdAndUpdate(
            id,
            { verifiedAgent: true }, // Update the verifiedAgent field
            { new: true } // Return the updated document
        );

        if (!updatedAgency) {
            return res.status(404).json({ message: "Agency not found" });
        }
        return res.status(200).json(updatedAgency);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// Reject an agency
//router.patch('/agencies/:id/reject', 
const rejectagency=async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAgency = await Agency.findByIdAndUpdate(
            id,
            { verifiedAgent: false }, // Set verifiedAgent to false or handle as needed
            { new: true } // Return the updated document
        );

        if (!updatedAgency) {
            return res.status(404).json({ message: "Agency not found" });
        }
        return res.status(200).json(updatedAgency);
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

const getUser = async (req, res) => {

    try {
        const email = req.params.email; 
        console.log("Fetching applications for email:", email); // Log the email received
        
        const userApplications = await Application.find({ email: email });
        console.log("User applications found:", userApplications); // Log the applications found
        
        if (!userApplications || userApplications.length === 0) {
            return res.status(404).json({ message: "No applications found for this user" });
        }

        return res.status(200).json(userApplications);
    } catch (error) {
        console.error("Error fetching user applications:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//agency application
/*const getAgency = async (req, res) => {
    try {
        const  agencyId  = req.params;
        console.log("Received agencyId:", req.params.agencyId);
        // Fetch all applications associated with the agencyId
        const applications = await AgencyStudentApplication.find({ agencyId: agencyId.toString() });
        
        // Log the fetched applications for debugging
        console.log("Fetched applications:", applications);

        if (!applications.length) {
            console.log("No applications found for this agency in the database.");
            return res.status(404).json({ message: "No applications found for this agency." });
        }

        res.status(200).json({ applications });
    } catch (error) {
        console.error("Error fetching agency applications:", error);

        if (error.name === "CastError") {
            return res.status(400).json({ message: "Invalid agency ID format" });
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAgency = async (req, res) => {
    try {
        const agencyId = req.params.agencyId;
        // Ensure you query based on the correct field, not the _id
        const data = await AgencyStudentApplication.find({ agencyId: agencyId });

        if (data.length === 0) {
            return res.status(404).json({ message: 'No applications found for this agency.' });
        }

        return res.status(200).json(data);  // Return the data in JSON format
    } catch (error) {
        console.error('Error fetching user:', error);  // Log the error
        res.status(500).json({ message: 'Internal Server Error' });
    }
};*/

const getAgency = async (req, res) => {
    try {
        const agencyId = req.params.agencyId; 
        console.log("Fetching applications for id:", agencyId); 
        
        const agencyApplications = await AgencyStudentApplication.find({ agencyId: agencyId });
        console.log("Agency applications found:", agencyApplications); // Log the applications found
        
        if (!agencyApplications || agencyApplications.length === 0) {
            return res.status(404).json({ message: "--No applications found for this user--" });
        }

        return res.status(200).json(agencyApplications);
    } catch (error) {
        console.error("Error fetching user applications:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }

    
};
const updateApplicationStatus = async (req, res) => {
    try {
        const { appId } = req.params;
        const { mystatus } = req.body;

        console.log("🟢 Received App ID:", appId);
        console.log("🟢 Status to Update:", mystatus);

        if (!appId || !mystatus) {
            return res.status(400).json({ message: "Application ID and Status are required!" });
        }

        const application = await AdminAgencyApplications.findById(appId);

        if (!application) {
            return res.status(404).json({ message: "Application not found!" });
        }

        application.mystatus = mystatus;
        await application.save();

        console.log("✅ Successfully Updated in DB:", application);

        res.json({ message: "Status updated successfully!", updatedApplication: application });
    } catch (error) {
        console.error("❌ Error updating status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateUserApplicationStatus = async (req, res) => {
    try {
        const { appId } = req.params;
        const { mystatus } = req.body;

        if (!appId || !mystatus) {
            return res.status(400).json({ message: "Application ID and Status are required!" });
        }

        const application = await Application.findById(appId);

        if (!application) {
            return res.status(404).json({ message: "Application not found!" });
        }

        application.mystatus = mystatus;
        await application.save();

        res.json({
            message: "Status updated successfully!",
            updatedApplication: application,
        });
    } catch (error) {
        console.error("❌ Error updating user application status:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


//changed

const getAdminStats = async (req, res) => {
    try {
        // Count the number of documents in each collection
        const studentCount = await User.countDocuments({ verified: true });;
        const partnerCount = await Agency.countDocuments({ verifiedAgent: true });
        const studentApplicationsCount = await Application.countDocuments();
        const partnerStudentApplicationsCount = await AgencyStudentApplication.countDocuments();
    
        // Return the counts in JSON format
        res.json({
          studentCount,
          partnerCount,
          studentApplicationsCount,
          partnerStudentApplicationsCount
        });
      } catch (error) {
        console.error('Error in getAdminStats:', error);
        res.status(500).json({ message: 'Server error' });
      }
  };

module.exports={getAdminStats,updateUserApplicationStatus,updateApplicationStatus,getAgency,getAllUsers,getAllAgency,deleteUserById,getUsersById,updateUserById,deleteAgencyById,getAgencyById,updateAgencyById,fliightTicketRequest,accomodationRequest,IELTSRequest,CounsellingRequest,queriesRequest,fetchAllAgency,acceptagency,rejectagency,getUser}