const express = require('express');
const router = express.Router();
const Student = require('../model/agency-students'); // Adjust path as needed

// Route to add a student
router.post('/add-student', async (req, res) => {
  try {
    const { university, course, link, userUID, agencyId } = req.body;

    // Create a new Student document
    const newStudent = new Student({
      university,
      course,
      link,
      userUID,
      agencyId
    });

    // Save the new Student document
    await newStudent.save();

    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Failed to add student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

module.exports = router;
