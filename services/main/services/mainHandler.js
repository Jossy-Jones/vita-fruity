const db = require('../../../database/config');
const Cart = require('../../../models/cart');

/*
* Static handlers below
*/


module.exports.Contact = (req, res)=> {
	res.render("main/contact", {pageTitle: "Contact us- Vita Fruity."});
}



/*
* Dynamic handlers below
*/


module.exports.Index = (req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});

	let cartTotalItems = (req.session.cart) ? cart.getData().totalItems :  null;

	db.query("SELECT * FROM categories", (err, categories)=>{
		db.query("SELECT * FROM products", (err, products)=>{
			console.log(categories);
			res.render("main/index", 
				{
					pageTitle : "Vita Fruity. Healthy Food, Made Fresh Daily", 
					products :  products,
					categories : categories
				});
		});
	});	
}




module.exports.Cart = (req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	let products = (req.session.cart) ? cart.getItems() :  [];
	
	res.render("main/cart", 
		{
			pageTitle : "Cart - Vita Fruity. Healthy Food, Made Fresh Daily", 
			products : products,
			totalPrice : cart.totalPrice
		});
}


module.exports.Checkout = (req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	let products = (req.session.cart) ? cart.getItems() :  [];


	if (products.length > 0) {
	 return	res.render("main/checkout", 
		{
			pageTitle: "Checkout - Vita Fruity. Healthy Food, Made Fresh Daily",
			products : products,
			totalPrice : cart.totalPrice
		});		
	} else {
		return res.redirect("/cart");
	}

}
