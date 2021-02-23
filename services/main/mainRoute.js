const express = require('express');
const route = express.Router();
const path = require("path");
const app = express();

const paystackPayment = require('../../helpers/paystackPayment');

const mainHandler = require("../main/services/mainHandler");

const mainService = require("../main/services/mainService");

const mainWorker = require("../main/services/mainWorker");

const Cart = require('../../models/cart');



//setting custom public path for entry route
app.use("/online-store/products/",express.static(path.join(__dirname, "public/main")));

route.get("/test", (req, res)=> {
	let cart = new Cart (req.session.cart ? req.session.cart : {});
	//console.log(cart.getItemForOrder());
	 delete req.session.cart;
	 req.session.save();

	 res.json(cart.getItems());	

});


//static routes
route.get("/contact", mainHandler.Contact);
route.get("/about-us", mainHandler.AboutPage);
route.get("/services", mainHandler.ServicePage);
route.get("/return-policy", mainHandler.ReturnPolicy);
route.get("/privacy-policy", mainHandler.PrivacyPolicy);


//dynamic routes
route.get("/", mainHandler.Index);
route.get("/cart", mainHandler.Cart);
route.get("/checkout", mainHandler.Checkout);
route.get("/checkout/success", mainHandler.CheckoutSuccess);
route.get("/online-store", mainHandler.OnlineStore);
route.get("/online-store/products/:slug", mainHandler.Product);
route.get("/online-store/categories/:slug", mainHandler.Category);
route.get("/online-store/search", mainHandler.Search);
route.get("/meal-plan/:slug", mainHandler.MealPlan);
route.get("/meal-plan/detox/:slug", mainHandler.DetoxMealPlan);






route.get('/*' ,(req, res) => {
	res.render("main/404" ,{pageTitle : "Page not found "});
});

//service end points
route.post("/test", (req, res)=> {
	// paystackPayment.init(req.body.reference, process.env.PAYSTACK_SK)
	// .then(resp => {
	// 	// success
	// 	console.log(resp.data.status);

	// }).catch(resp => {
	// 	console.log("failed");
	// });

	// let cart = new Cart (req.session.cart ? req.session.cart : {});
	// console.log(cart);
	// res.json(cart.totalPrice);

	res.json({
		cart : req.session.cart 
	});
});

//cart
route.post("/json/cart/add", mainService.addToCart);
route.post("/json/cart/get", mainService.getCart);
route.post("/json/cart/get/item", mainService.getItemById);
route.post("/json/cart/update/qty", mainService.updateQty);
route.post("/json/cart/delete", mainService.removeCartItem);


//order
route.post("/json/order/init", mainService.initOrder);
route.post("/json/order/submit", mainService.submitOrder);
route.post("/json/order/meal-plan/submit", mainService.submitMealPlanOrder);

//checkout
route.post("/json/checkout/pay", mainService.pay);
route.post("/json/checkout/meal-plan/pay", mainService.payMealPlan);


// Workers
route.post("/api/workers/zones", mainWorker.LocationZoneStore)

module.exports =  route;