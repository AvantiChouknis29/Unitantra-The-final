const Flight = require("../model/AirTicket");

const profileForm = async (req, res) => {
  try {
    const response = req.body;
    await Flight.create(response);
    return res.status(200).json({ message: "Request sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "message not delivered" });
  }
};

module.exports = profileForm;