const express = require("express");
const router = express.Router();

const profileForm = require("../controllers/AirTicket");
router.route("/airticket").post(profileForm);

module.exports = router;