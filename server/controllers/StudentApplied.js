
const { Application } = require('../controllers/application-controller');
const applied = async (req, res) => {
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
  
  module.exports =applied;