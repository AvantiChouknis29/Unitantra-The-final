const express=require("express");
const cart_route=express();
const bodyParser=require("body-parser")
cart_route.use(bodyParser.json())
cart_route.use(bodyParser.urlencoded({extended:true}))

const auth=require("../middlewares/auth-middleware");
const cart_controller=require("../controllers/cartController")

cart_route.post('/add-to-cart',auth,cart_controller.add_to_cart)
cart_route.get('/get-cart-items', auth, cart_controller.getCartItems);


module.exports=cart_route;