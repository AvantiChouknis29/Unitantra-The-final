const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    university: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Cart", cartSchema);
