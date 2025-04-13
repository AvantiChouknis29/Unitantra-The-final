const express = require("express");
const router = express.Router();
const { agencyProfileForm } = require("../controllers/agencyProfiler-controller.js"); // Import correctly

router.post('/agency_profile', agencyProfileForm);

module.exports = router;
