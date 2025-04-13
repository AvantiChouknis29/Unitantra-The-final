const express = require("express");
const router = express.Router();

const AccomodationForm = require("../controllers/Accomodation-controller");
router.route("/accomodation").post(AccomodationForm);

module.exports = router;