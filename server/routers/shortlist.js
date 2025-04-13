// routes/shortlist.js

// University model
const University = {
  // Define properties of the University model
  name: String,
  course: String,
  level: String,
  country: String,
  // Add more properties as needed
};

// Import necessary modules
const express = require('express');
const router = express.Router();

router.post('/shortlistUniversity', async (req, res) => {
  const { university } = req.body;

  if (!university) {
    return res.status(400).json({ message: 'University data is required' });
  }

  try {
    // Save the university data to the database (mock implementation)
    const result = await saveUniversityToDatabase(university);
    res.status(200).json({ message: 'University shortlisted successfully', university: result });
    console.log(university)
  } catch (error) {
    console.error('Error saving university:', error);
    res.status(500).json({ message: 'Error saving university' });
  }
});

// Function to save university data to the database (mock implementation)
async function saveUniversityToDatabase(university) {
  // Here you would typically save the university data to your database
  // For this example, let's just return the provided university data
  return university;
}

module.exports = router;
