const moment = require('moment');
const validator = require('validator');
const { uuid } = require('uuidv4');

const db = require('../../../database/config');
const Cart = require('../../../models/cart');
const utilOrder = require('../util/order')
const helpers = require('../../../helpers/helpers');
const paystackPayment = require('../../../helpers/paystackPayment');



module.exports.addToCart = (req, res)=> {

	let cart = new Cart(req.session.cart ? req.session.cart : {});	

	db.query("SELECT * FROM products WHERE id = ?", req.body.id, (err, product)=> {
		if (product.length > 0 ) {
			cart.add(product[0], product[0].id);
			req.session.cart = cart;
			res.json({
				status: true, 
				message: `${product[0].name} has been added to cart`, 
				product : product,
				cart : cart.getData()
			});
			console.log(req.session.cart);
		}else { 
			res.json({status: false, product :  [] }); 
		}

	})
	
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



module.exports.removeCartItem = (req, res) => {	
	let cart  = null;
	let id = req.body.id; // product id in cart 

	if (req.session.cart) {
		cart = new Cart(req.session.cart ? req.session.cart : {});
		 res.json({
		 	status : true, 
		 	message : `${cart.getItemById(id).item.name} has been removed from cart`,
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
	let Order = module.exports = function(s, p) {
	     this.shippingMethod = s;
	     this.pickupTime = p;
	}; 


	let asm = ['pickup', 'delivery']; // allowed shipping methods

	let shippingMethod = req.body.shippingMethod;
 	let pickupTime = req.body.pickupTime;

 	let e = null; // error
 	let status = false;

 	if (!asm.includes(shippingMethod)) {
 		e = "Invalid shipping method";
 	}
 	if (!helpers.pickupTimeRangeIsValid(pickupTime)) {
 		e = "Please pick time between 9:00am & 8:00pm";
 	}


 	if (e == null) {
		req.session.order = new Order(shippingMethod, pickupTime);		
 		req.session.save();
 		status = true;		
 	}

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

			 // restoring storing initial 
		     this.shippingMethod = session.order.shippingMethod;
		     this.pickupTime = session.order.pickupTime;

		     // storing new values
		     this.customer_name = `${formData.lastName.trim().toUpperCase()} ${formData.firstName.trim()}`;
		     this.customer_phone = formData.phone.trim();
		     this.customer_email = formData.email.trim();
		     this.is_not_pip = (formData.isNotPip == 1) ? 1 : null;
		     this.add_info  =  (formData.addInfo) ? formData.addInfo.trim() : null;
		     this.address = formData.address.trim();

		}; 

			req.session.order = new Order(req.body, req.session);		
	 		req.session.save();

	 		console.log(req.session.order);

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
