
/*
const User = require('../models/user-model');

//edited

const getAllUsers = async (req, res) => {
    const { username, email } = req.query;
    const queryObject = {};

    if (username) {
        queryObject.username = { $regex: username, $options: "i" };
    }
    if (email) {
        queryObject.email = { $regex: email, $options: "i" };
    }

    console.log(queryObject);
    try {
        const myData = await User.find(queryObject);
        res.status(200).json({ myData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getAllUsers;*/


//Developer cmmnt-Course filter not working -frontend

const mongoose = require("mongoose");

// Define the university schema
const universitySchema = new mongoose.Schema({
    Course: {
        type: String,
        required: true
    },
    URL: {
        type: String,
        required: true
    },
    Domain: {
        type: String,
        required: true
    },
    Duration: {
        type: String,
        required: true
    },
    Level: {
        type: String,
        required: true
    },
    Fee: {
        type: String,
        required: true
    },
    University: {
        type: String,
        required: true
    },
    Country: {
        type: String,
        required: true
    }
});

// Define the University model
const University = mongoose.model("University", universitySchema);

const getAllUniversities = async (req, res) => {
    const { course, university, level, country, page = 1, limit = 10 } = req.query;
    const queryObject = {};

    if (university) {
        queryObject.University = { $regex: university, $options: "i" };
    }
    if (level) {
        queryObject.Level = { $regex: level, $options: "i" };
    }
    if (course) {
        queryObject.Course = { $regex: course, $options: "i" };
    }
    if (country) {
        queryObject.Country = { $regex: country, $options: "i" };
    }

    console.log(queryObject);

    try {
        const totalItems = await University.countDocuments(queryObject);
        const totalPages = Math.ceil(totalItems / limit);
        const universities = await University.find(queryObject)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({ universities, totalPages, currentPage: page });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = getAllUniversities;
