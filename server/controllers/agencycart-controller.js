const AgencyCart = require("../model/agencyCart-Model");

const agency_add_to_cart = async (req, res) => {
    try {
        const agency_cart_obj = new AgencyCart({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            UID: req.body.UID,
            link: req.body.link,
            university: req.body.university,
            course: req.body.course
        });

        const agencyCartData = await agency_cart_obj.save();
        res.status(200).send({ success: true, msg: "Cart details", data: agencyCartData });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};

// Make sure the export is correct
module.exports = {
    agency_add_to_cart
};
