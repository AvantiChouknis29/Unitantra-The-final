// userRoutes.js
const express = require('express');
//const authAgencyMiddleware=require("../middlewares/auth-agency-middleware")
const { fetchUniqueUsersByUID } = require('../controllers/agencyFetchById'); // Adjust path as needed
const router = express.Router();

router.post('/agency/students', fetchUniqueUsersByUID);

module.exports = router;
