const express = require("express");
const router = express.Router();

const profileForm = require("../controllers/Queries");
router.route("/queries").post(profileForm);

module.exports = router;