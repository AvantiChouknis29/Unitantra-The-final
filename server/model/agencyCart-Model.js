const mongoose = require("mongoose");

const agencyCartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    UID: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("AgencyCart", agencyCartSchema);
