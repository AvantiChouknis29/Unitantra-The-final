const movieTicket = require("../model/newmovieticket");

const movieTicketForm = async (req, res) => {
    try {
        const response = req.body;
        await movieTicket.create(response);
        return res.status(200).json({ message: "Message sent successfully!" }); // Change status to 200
    } catch (error) {
        return res.status(500).json({ message: "Failed!" });
    }
};

module.exports = movieTicketForm;
