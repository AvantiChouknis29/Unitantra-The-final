// add-a-student-agency.js
const addStudentAgency = require("../model/addstudentagency");

const agencyAddStudentForm = async (req, res) => {
  try {
    const response = req.body;
    await addStudentAgency.create(response); // Saves the received data, including UID
    return res.status(200).json({ message: "Student added successfully!" });
  } catch (error) {
    return res.status(400).json({ message: "Failed to add student!" });
  }
};


  
module.exports = { agencyAddStudentForm};

