const moment = require('moment');

const db = require('../../../database/config');
const Cart = require('../../../models/cart');
const utilOrder = require('../util/order')
const helpers = require('../../../helpers/helpers');



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




module.exports.orderAndPay = (req, res) => {

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
