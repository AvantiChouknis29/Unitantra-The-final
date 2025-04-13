const express = require("express");
const router = express.Router();

const IELTSForm = require("../controllers/IELTS-controller");
router.route("/ielts").post(IELTSForm);

module.exports = router;