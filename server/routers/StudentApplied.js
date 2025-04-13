const express = require("express");
const router = express.Router();

const applied = require("../controllers/StudentApplied"); // Import the `applied` function directly

router.get("/applied/:email", applied); // Define `email` as a route parameter

module.exports = router;
