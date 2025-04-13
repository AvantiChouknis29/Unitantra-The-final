const express = require("express");
const router = express.Router();

const CounsellingForm = require("../controllers/Counselling");
router.route("/counselling").post(CounsellingForm);

module.exports = router;