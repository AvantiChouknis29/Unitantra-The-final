
const express = require("express");
const router = express.Router();
const {profileForm} = require("../controllers/application-controller");

router.route("/submitApplication").post(profileForm);

module.exports = router;