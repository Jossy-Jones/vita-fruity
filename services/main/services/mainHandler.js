const db = require('../../../database/config');
const Cart = require('../../../models/cart');

/*
* Static handlers below
*/


module.exports.Contact = (req, res)=> {
	res.render("main/contact", {pageTitle: "Contact us - Vita Fruity."});
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

	console.trace(req.session.order);

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


module.exports.CheckoutSuccess = (req, res)=> {

	if (req.session.order.key) {
		return res.render("main/purchase_details", 
			{
				pageTitle: `Purchase sucessful - ${req.session.order.key} - Vita Fruity.`,
				orderKey : req.session.order.key
			});		
	} else {
		return res.status(404).send("Not found.");
	}

}


module.exports.OnlineStore = (req, res)=> {
	db.query("SELECT * FROM categories", (err, categories)=>{
		db.query("SELECT * FROM products", (err, products)=>{
			console.log(categories);
			res.render("main/store", 
				{
					pageTitle : "Vita Fruity. Healthy Food, Made Fresh Daily", 
					products :  products,
					categories : categories
				});
		});
	});	
}


module.exports.Product = (req, res)=> {
	db.query("SELECT * FROM products WHERE NOT slug =  ? ORDER BY RAND() LIMIT 3", req.params.slug, (err, products)=>{

		db.query("SELECT * FROM categories", (err, categories)=>{
			db.query("SELECT * FROM products WHERE slug = ?" ,req.params.slug, (err, product)=>{
				res.render("main/product", 
					{
						pageTitle : `${product[0].name.toUpperCase()} - Vita Fruity. Healthy Food, Made Fresh Daily`, 
						products : products,
						product :  product[0],
						categories : categories
					});
			});
		});
	});	
}


module.exports.Category = (req, res)=> {	
	db.query("SELECT * FROM categories" , (err, categories)=>{

		let category = categories.find(c => c.slug === req.params.slug); // find category by slug

		db.query("SELECT * FROM products WHERE category_id = ?", category.id , (err, products)=>{

			res.render("main/categories", 
				{
					pageTitle : `${category.name.toUpperCase()} - Vita Fruity. Healthy Food, Made Fresh Daily`, 
					products : products,
					category : category,
					categories : categories
				});
		});	
	});	
}


module.exports.Search = (req, res)=> {	
	db.query("SELECT * FROM categories" , (err, categories)=>{
		db.query("SELECT * FROM products WHERE name LIKE N? " , ['%'+req.query.s+'%'], (err, products)=>{
			console.log(products);
				res.render("main/search", 
					{
						pageTitle : `${req.query.s} - Search - Vita Fruity. Healthy Food, Made Fresh Daily`,
						products : products,
						categories : categories,
						query : req.query.s
					});

		});	
	});	
}
