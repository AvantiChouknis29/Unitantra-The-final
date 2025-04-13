// agencyAddStudent-router.js
const express = require('express');
const router = express.Router();
const { agencyAddStudentForm } = require("../controllers/add-a-student-agency");

// Define the POST route that the frontend will call
router.post('/api/add-a-student-agency', agencyAddStudentForm);

module.exports = router;
