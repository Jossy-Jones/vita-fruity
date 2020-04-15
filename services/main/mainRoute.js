const express = require('express');
const route = express.Router();

const app = express();

const paystackPayment = require('../../helpers/paystackPayment');

const mainHandler = require("../main/services/mainHandler");

const mainService = require("../main/services/mainService");

route.get("/test", (req, res)=> {
	console.log(req.session.cart);
	 delete req.session.cart;
	 //req.session.save();
	res.send(req.session.cart.totalItems); 
});

//dynamic routes
route.get("/", mainHandler.Index);
route.get("/cart", mainHandler.Cart);
route.get("/checkout", mainHandler.Checkout);

//static routes
route.get("/contact", mainHandler.Contact);


//service end points
route.post("/test", (req, res)=> {
	paystackPayment.init(req.body.reference, process.env.PAYSTACK_SK)
	.then(resp => {
		// success
		console.log(resp.data.status);

	}).catch(resp => {
		console.log("failed");
	});
});

route.post("/json/cart/add", mainService.addToCart);
route.post("/json/cart/get", mainService.getCart);
route.post("/json/cart/get/item", mainService.getItemById);
route.post("/json/cart/update/qty", mainService.updateQty);
route.post("/json/cart/delete", mainService.removeCartItem);

module.exports =  route;