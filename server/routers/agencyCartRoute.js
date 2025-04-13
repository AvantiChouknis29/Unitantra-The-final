const express = require("express");
const agency_cart_route = express.Router();
const bodyparser = require("body-parser");
const agency_cart_controller = require("../controllers/agencycart-controller"); // Ensure this path is correct

agency_cart_route.use(bodyparser.json());
agency_cart_route.use(bodyparser.urlencoded({ extended: true }));

const auth = require("../middlewares/auth-agency-middleware");

// Ensure agency_cart_controller.agency_add_to_cart is defined
agency_cart_route.post('/agencycart', auth, agency_cart_controller.agency_add_to_cart);

module.exports = agency_cart_route;
