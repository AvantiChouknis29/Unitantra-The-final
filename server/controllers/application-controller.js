const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Mongoose schema for application
const applicationSchema = new Schema({
  university: { type: String, required: true },
  course: { type: String, required: true },
  link: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true }, // Assuming username is required
  phone: { type: String, required: true },
  mystatus:{
    type:String,
}
});

// Define Mongoose model based on schema
const Application = mongoose.model('Application', applicationSchema);

// Application submission handler function
const submitApplication = async (req, res) => {
  try {
    const applicationData = req.body;
    await Application.create(applicationData);
    return res.status(200).json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error submitting application:", error);
    return res.status(500).json({ message: "Failed to submit application" });
  }
};




module.exports = {
  submitApplication,
  Application,
 
  
};
