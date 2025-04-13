const express = require("express");
const router = express.Router();

const movieTicketForm = require("../controllers/movieTicket-controller");
router.route("/movieTicket").post(movieTicketForm);

module.exports = router;