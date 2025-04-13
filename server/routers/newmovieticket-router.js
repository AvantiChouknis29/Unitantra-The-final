const express = require("express");
const router = express.Router();

const movieTicketForm = require("../controllers/newmovieticket-controller");
router.route("/movieticket").post(movieTicketForm);

module.exports = router;