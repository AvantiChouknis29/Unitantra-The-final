const express = require('express');
const Application = require('../model/cartModel'); // Adjust the import according to your project structure

const app = express();

const getApplications = async (req, res) => {
    try {
        if (!req.user || !req.user.email) {
            return res.status(400).send({ success: false, msg: "User email is required." });
        }

        const userEmail = req.user.email;
        const applications = await Application.find({ userEmail: userEmail });
        res.status(200).send({ success: true, applications: applications });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};

module.exports = {
    getApplications
};
