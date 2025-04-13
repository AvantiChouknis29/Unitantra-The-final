const express = require("express");
const router = express.Router();

const profileForm = require("../controllers/profile-controller");
router.route("/profile").post(profileForm);

module.exports = router;