require('dotenv').config();
const moment = require('moment');
const validator = require('validator');
const { uuid } = require('uuidv4');
const Cryptr = require('cryptr');


const db = require('../../../database/config');
const Cart = require('../../../models/cart');
const utilOrder = require('../util/order')
const helpers = require('../../../helpers/helpers');
const paystackPayment = require('../../../helpers/paystackPayment');


const cryptr = new Cryptr(process.env.SESSION_SECRET);


module.exports.addToCart = (req, res)=> {

	// This module item to cart with the id of the product in the database

	let cart = new Cart(req.session.cart ? req.session.cart : {});	

	let ordereredExtras = [];

	let extrasId = [];

	const flavourId = req.body.flavourId || 0;

	let flavour = null;

	console.log(req.body.extras)


	if (req.body.extras) {
		//parsing extras  to integer
		extrasId = req.body.extras.join().split(',').map((item)=> {
	  	  return parseInt(item, 10);
		});	
	}



	db.query("SELECT * FROM sub_products WHERE id = ?", req.body.id, (err, sp)=> {
		
		db.query("SELECT * FROM products WHERE id = ?", sp[0].product_id, (err, product)=> {

			let spName = (sp[0].name === "*") ? "" : `(${sp[0].name})`;


			db.query("SELECT * FROM extras WHERE id IN (?)", [extrasId], (err, extras)=>{

				db.query("SELECT * FROM flavours WHERE id = ?", flavourId, (err, flavours)=>{ 

					if(flavours && flavours.length > 0 ){
						flavour = flavours[0];
					} 

					//if extras exists
					if (req.body.extras) {
						ordereredExtras = extras || null;
						if (product.length > 0 ) {
							cart.add(sp[0], product[0], ordereredExtras, flavour);
							req.session.cart = cart;
							req.session.save();
							return res.json({
								status: true, 
								message: `${product[0].name} ${spName}  has been added to cart`, 
								product : product,
								cart : cart.getData()
							});
						}else { 
							res.json({status: false, product :  [] }); 
						}	
					}

					//if no extras
					if (!req.body.extras) {
						if (product.length > 0 ) {
							cart.add(sp[0], product[0], [] ,flavour);
							req.session.cart = cart;
							req.session.save();
							return res.json({
								status: true, 
								message: `${product[0].name} ${spName}  has been added to cart`, 
								product : product,
								cart : cart.getData()
							});
						}else { 
							res.json({status: false, product :  [] }); 
						}						
					}

				});
			});							
		});


	});
	
}

module.exports.getCart = (req, res) => {	
	let cart  = null;
	let data = null;

	if (req.session.cart) {
		cart = new Cart(req.session.cart ? req.session.cart : {});
		data = cart.getData();

	}
	res.json({status: true, cart: data}); 
}


module.exports.getItemById = (req, res) => {	
	let cart  = null;
	let data = null;

	if (req.session.cart) {
		cart = new Cart(req.session.cart ? req.session.cart : {});
		data = cart.getItemById(req.body.id);
	}

	res.json({status: true, data: data}); 
}


module.exports.getItemTotalPrice = (req, res) => {	
	let cart  = null;
	let data = null;

	if (req.session.cart) {
		cart = new Cart(req.session.cart ? req.session.cart : {});
		data = cart.getItemTotalPrice(req.body.id);
	}

	console.trace("a=>"+data.item.price);

	res.json({status: true, data: data}); 
}



module.exports.removeCartItem = (req, res) => {	
	let cart  = null;
	let id = req.body.id; // product id in cart 

	if (req.session.cart) {
		cart = new Cart(req.session.cart ? req.session.cart : {});
		let productName = cart.getItemById(id).superItem.name;
		let spName = (cart.getItemById(id).item.name === "*") ? "" : `(${cart.getItemById(id).item.name})`;
		 res.json({
		 	status : true, 
		 	message : `${productName} - ${spName}  has been removed from cart`,
		 	totalItems :  cart.totalItems - cart.getItemById(id).qty,
		 	totalPrice :  cart.totalItems - cart.getItemById(id).price
		 });	
		 cart.remove(id);
		 req.session.save();
		 console.log(cart.totalItems);
		 return console.log(`removed from cart`);
	}

	res.json({status: false, message : `error occured`}); 
}



module.exports.updateQty = (req, res) => {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	cart.setQty(req.body.id, req.body.qty);
	res.json({status: true, message : `updated quantity`}); 
}





module.exports.initOrder= (req, res) => {
	let Order = module.exports = function(s, p, z = null) {
	     this.shippingMethod = s;
	     this.pickupTime = p;


	     //initializing zones
	     this.zone_name = null;
	     this.zone_desc = null;
	     this.zone_price = 0;


	     if (z) {
	     	console.log("Zone Condition met");

	     	 z =  cryptr.decrypt(z);

	     	 z = z.split(",");

	     	 console.log("=>zone"+z);

		     this.zone_name = z[0];
		     this.zone_desc = z[1];
		     this.zone_price = parseInt(z[2]);
	     }
	}; 


	let asm = ['pickup', 'delivery']; // allowed shipping methods

	let shippingMethod = req.body.shippingMethod;
 	let pickupTime = req.body.pickupTime;
 	let zoneData = (parseInt(req.body.zone) != 0) ? req.body.zone : null;

 	let e = null; // error
 	let status = false;

 	console.log(zoneData);

 	if (!asm.includes(shippingMethod)) {
 		e = "Invalid shipping method";
 	}
 	if (!helpers.pickupTimeRangeIsValid(pickupTime)) {
 		e = "Please pick time between 9:00am & 8:00pm";
 	}


 	if (e == null) {
		req.session.order = new Order(shippingMethod, pickupTime, zoneData);		
 		req.session.save();
 		status = true;		
 	}

 	console.log(req.session.order);

 	return res.json({status : status, message : e });
}		


module.exports.submitOrder = (req, res) => {
	let e = null;
	if (req.body.firstName.trim() == '' || req.body.firstName.length == 0) {
		e = "Your FIRST NAME should not be empty !";
	} else if(req.body.lastName.trim() == '' || req.body.lastName.length == 0) {
		e = "Your LAST NAME should not be empty !";
	} else if(!validator.isEmail(req.body.email)){
		e = "Please enter a valid EMAIL !";
	} else if(req.body.phone.trim() == '' || req.body.phone.trim().length == 0){
		e = "PHONE NUMBER is required !";
	}else if (req.body.phone.trim() && req.body.phone.trim().length != 11) {
		e = "Please enter valid PHONE NUMBER";
	}else if (req.body.address.trim().length == 0) {
		e = "You must fill your RESIDENTIAL ADDRESS";
	}

	console.log(req.body);

	
	if (e == null) {
		let cart = new Cart(req.session.cart ? req.session.cart : {});

		let Order = module.exports = function(formData, session) {

			 //storing key
			 this.key = uuid().toUpperCase().slice(0, 7);

			 // restoring values from old Order model in initOrder() 
		     this.shippingMethod = session.order.shippingMethod;
		     this.pickupTime = session.order.pickupTime;
		     this.zone_name = session.order.zone_name;
		     this.zone_desc = session.order.zone_desc;
		     this.zone_price = session.order.zone_price;

		     // storing new values
		     this.customer_name = `${formData.lastName.trim().toUpperCase()} ${formData.firstName.trim()}`;
		     this.customer_phone = formData.phone.trim();
		     this.customer_email = formData.email.trim();
		     this.is_not_pip = (parseInt(formData.isNotPip) === 1) ? 1 : null;
		     this.add_info  =  (formData.addInfo) ? formData.addInfo.trim() : null;
		     this.address = formData.address.trim();

		}; 

			req.session.order = new Order(req.body, req.session);		
	 		req.session.save();

	 		/*console.log(req.session.order);*/

	 		if (req.session.order) {
	 			return res.json({status : true, message : "temporarily saved customer details" });	
	 		}

	}  else {
		console.log(e);
		return res.json({status : false, message : e });
	}

}



module.exports.pay = (req, res) => {
	let cart = new Cart(req.session.cart ? req.session.cart : {});

	
	paystackPayment.init(req.body.reference, process.env.PAYSTACK_SK)
	.then(resp => {
		// success
		utilOrder.saveCustomerDetails(req.session, cart, req.body.reference)
		.then (()=>{
			//empty cart
			req.session.cart = null;
			req.session.save();

			return res.json({status : true, message : "Transaction successful" });
		}).catch((r)=>{
			console.log(r);
		});


	}).catch(resp => {
		res.json({status: false, message : `payment failed`});
	});
}



module.exports.submitMealPlanOrder = (req, res) => {
	let e = null;
	if (req.body.firstName.trim() == '' || req.body.firstName.length == 0) {
		e = "Your FIRST NAME should not be empty !";
	} else if(req.body.lastName.trim() == '' || req.body.lastName.length == 0) {
		e = "Your LAST NAME should not be empty !";
	} else if(!validator.isEmail(req.body.email)){
		e = "Please enter a valid EMAIL !";
	} else if(req.body.phone.trim() == '' || req.body.phone.trim().length == 0){
		e = "PHONE NUMBER is required !";
	}else if (req.body.phone.trim() && req.body.phone.trim().length != 11) {
		e = "Please enter valid PHONE NUMBER";
	}else if (req.body.address.trim().length == 0) {
		e = "You must fill your RESIDENTIAL ADDRESS";
	}  else if (!helpers.pickupTimeRangeIsValid(req.body.pickupTime)) {
 		e = "Please pick time between 9:00am & 8:00pm";
 	}


	
	if (e == null) {
		let cart = new Cart(req.session.cart ? req.session.cart : {});

		let MealPlanOrder = module.exports = function(arg) {
				this.data = arg;		
		}; 

		/*console.log(Order);*/

			req.session.meal_plan_order = new MealPlanOrder(req.body);		
	 		req.session.save();

	 		/*console.log(req.session.order);*/

	 		if (req.session.meal_plan_order) {
	 			return res.json({status : true, message : "temporarily saved customer details" });	
	 		}

	}  else {
		console.log(e);
		return res.json({status : false, message : e });
	}

}



module.exports.payMealPlan = (req, res) => {

	paystackPayment.init(req.body.reference, process.env.PAYSTACK_SK)
	.then(resp => {
		//console.trace(resp.data.data);
		// success
		utilOrder.saveMealPlanOrder(req.session.meal_plan_order.data, resp.data.data.amount, req.body.reference)
		.then ((key)=>{
			//empty cart

			let Order = module.exports = function(k) {
					this.key = k;		
			}; 

			req.session.order = new Order(key);
			req.session.cart = null;
			req.session.save();

			return res.json({status : true, message : "Transaction successful" });
		}).catch((r)=>{
			console.log(r);
		});


	}).catch(resp => {
		res.json({status: false, message : `payment failed`});
	});
}
