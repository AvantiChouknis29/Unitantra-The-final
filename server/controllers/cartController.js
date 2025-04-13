const add_to_cart = async (req, res) => {
    const Cart = require("../model/cartModel");
    try {
        // Check if user's email is available in the request object
        if (!req.user || !req.user.email) {
            return res.status(400).send({ success: false, msg: "User email is required." });
        }

        const userEmail = req.user.email;

        const cart_obj = new Cart({
            university: req.body.university,
            course: req.body.course,
            link: req.body.link,
            userEmail: userEmail,
        });

        const cartData = await cart_obj.save();
        res.status(200).send({ success: true, msg: "University", data: cartData });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}
const getCartItems = async (req, res) => {
    const Cart = require("../model/cartModel");
    try {
        // Assuming the user is authenticated and req.user is available
        const userEmail = req.user.email;
        const cartItems = await Cart.find({ userEmail: userEmail });
        res.status(200).send({ success: true, universities: cartItems });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
};

module.exports = {
    add_to_cart,
    getCartItems
}
