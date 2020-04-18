const express = require('express');
const route = express.Router();
const path = require("path");
const app = express();

const paystackPayment = require('../../helpers/paystackPayment');

const mainHandler = require("../main/services/mainHandler");

const mainService = require("../main/services/mainService");

//setting custom public path for entry route
app.use("/online-store/products/",express.static(path.join(__dirname, "public/main")));

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
route.get("/online-store", mainHandler.OnlineStore);
route.get("/online-store/products/:slug", mainHandler.Product);
route.get("/online-store/categories/:slug", mainHandler.Category);
route.get("/online-store/search", mainHandler.Search);

//static routes
route.get("/contact", mainHandler.Contact);



route.get('/*' ,(req, res) => {
	res.render("main/404" ,{pageTitle : "Page not found "});
});

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

//cart
route.post("/json/cart/add", mainService.addToCart);
route.post("/json/cart/get", mainService.getCart);
route.post("/json/cart/get/item", mainService.getItemById);
route.post("/json/cart/update/qty", mainService.updateQty);
route.post("/json/cart/delete", mainService.removeCartItem);

//checkout
route.post("/json/checkout/pay", mainService.orderAndPay);

module.exports =  route;