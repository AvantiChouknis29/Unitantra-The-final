const express = require("express");
const router = express.Router();
const agencyApplication = require("../controllers/agencyApplication-controller");

// Use the root path ('/') since the prefix is already handled in server.js
router.route('/').get(agencyApplication);

module.exports = router;
