const moment = require('moment');
const db = require('../../../database/config');
const Cart = require('../../../models/cart');
const helpers = require('../../../helpers/helpers');

/*
* Static handlers below
*/


module.exports.Contact = (req, res)=> {
	res.render("main/contact", {pageTitle: "Contact Us - Vita Fruity."});
}

module.exports.AboutPage = (req, res)=> {
	res.render("main/about_page", {pageTitle: "About Us - Vita Fruity."});
}

module.exports.ServicePage = (req, res)=> {
	res.render("main/services_page", {pageTitle: "Our Services - Vita Fruity."});
}

module.exports.PrivacyPolicy = (req, res)=> {
	res.render("main/privacy_policy", {pageTitle: "Privacy Policy - Vita Fruity."});
}

module.exports.ReturnPolicy = (req, res)=> {
	res.render("main/return_policy", {pageTitle: "Return Policy - Vita Fruity."});
}

// module.exports.DetoxMealPlan = (req, res)=> {
// 	res.render("main/detox_meal_plan", {pageTitle: "Detox Meal Plan - Vita Fruity."});
// }


module.exports.DetoxMealPlan = (req, res)=> {

	db.query("SELECT * FROM meal_plans WHERE slug = ? ", req.params.slug, (err, mealPlan)=> {
		if (err) { throw err;}

		if (mealPlan.length > 0) {
			mealPlan = mealPlan[0];
			res.render("main/detox_meal_plan", 
					{
						pageTitle: `${mealPlan.name} - Detox Plan - Vita Fruity.`,
						mealPlan: mealPlan,
						dt : {
							min: moment(new Date).format("YYYY-MM-DD"),
							max: moment(new Date).add(1, 'M').format("YYYY-MM-DD"),

						}
					}
				);
		}else {
			res.redirect("/404");
		}	

	})

}


module.exports.MealPlan = (req, res)=> {

	db.query("SELECT * FROM meal_plans WHERE slug = ? ", req.params.slug, (err, mealPlan)=> {
		if (err) { throw err;}

		if (mealPlan.length > 0) {
			mealPlan = mealPlan[0];
			res.render("main/meal_plan_page", 
					{
						pageTitle: `${mealPlan.name} - Meal Plan - Vita Fruity.`,
						mealPlan: mealPlan,
						dt : {
							min: moment(new Date).format("YYYY-MM-DD"),
							max: moment(new Date).add(1, 'M').format("YYYY-MM-DD"),

						}
					}
				);
		}else {
			res.redirect("/404");
		}	

	})

}



/*
* Dynamic handlers below
*/


module.exports.Index = (req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});

	let cartTotalItems = (req.session.cart) ? cart.getData().totalItems :  null;



	db.query("SELECT * FROM categories", (err, categories)=>{
		console.log(categories);

			categories = [
				categories[0],
				categories[1],
				categories[2],
				categories[3],
				categories[4],
				categories[6],
				categories[7],
				categories[8],
				categories[5] //others
			];

		db.query("SELECT * FROM products ORDER BY RAND()", (err, products)=>{
			db.query("SELECT * FROM sub_products ",  (err, sp)=> {

				db.query("SELECT * FROM extras",  (err, extras)=> {	

					db.query("SELECT * FROM flavours",  (err, flavours)=> {	

						let p = [];	
						for (var i = 1; i < products.length; i++) {
							let productHasSubProduct = sp.find(x => x.product_id === products[i].id);

							if (productHasSubProduct) {
								p.push(products[i]);	
							}
						}

						res.render("main/index", 
							{
								pageTitle : "Vita Fruity. Healthy Food, Made Fresh Daily", 
								products :  p,
								categories : categories,
								extras : extras,
								flavours: flavours,
								subProducts : sp
							});
						});		
				});	

			});

		});
	});	
}




module.exports.Cart = (req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	let products = (req.session.cart) ? cart.getItems() :  [];
	let zones =  (req.session.zones) ? req.session.zones : [];
	let zoneDataCrypt =  (req.session.zoneDataCrypt) ? req.session.zoneDataCrypt : false;


		db.query("SELECT * FROM zones", (err, zones) => {
			if(!zoneDataCrypt) {
				for (let i = 0; i < zones.length; i++) {
					zoneDataCrypt[i] = helpers.encrypt([zones[i].name, zones[i].description, zones[i].price]);
				}
				req.session.zoneDataCrypt = zoneDataCrypt
				req.session.save();
			}

			return res.render("main/cart", {
				pageTitle : "Cart - Vita Fruity. Healthy Food, Made Fresh Daily", 
				products : products,
				totalPrice : cart.totalPrice,
				zones : zones,
				zoneDataCrypt: zoneDataCrypt
			});
		});
	

}


module.exports.Checkout = (req, res)=> {
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	let products = (req.session.cart) ? cart.getItems() :  [];


	if (products.length > 0) {
	 return	res.render("main/checkout", 
		{
			pageTitle : "Checkout - Vita Fruity. Healthy Food, Made Fresh Daily",
			products : products,
			totalPrice : cart.totalPrice,
			order :req.session.order 
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

			categories = [
				categories[0],
				categories[1],
				categories[2],
				categories[3],
				categories[4],
				categories[6],
				categories[7],
				categories[8],
				categories[5] //others
			];


		db.query("SELECT * FROM products ORDER BY RAND()", (err, products)=>{
			db.query("SELECT * FROM sub_products",  (err, sp)=> {
				db.query("SELECT * FROM extras",  (err, extras)=> {
					db.query("SELECT * FROM flavours",  (err, flavours)=> {		

					let p = [];	
					for (var i = 1; i < products.length; i++) {
						let productHasSubProduct = sp.find(x => x.product_id === products[i].id);

						if (productHasSubProduct) {
							p.push(products[i]);	
						}
					}

					
					
				

					res.render("main/store", 
						{
							pageTitle : "Online store -  Vita Fruity. Healthy Food, Made Fresh Daily", 
							products :  p,
							categories : categories,
							extras : extras,
							flavours : flavours,
							subProducts : sp
						});
					});
				});	
			});
		});
	});	
}


module.exports.Product = (req, res)=> {
	db.query("SELECT * FROM products WHERE NOT slug = ? ORDER BY RAND() LIMIT 3", req.params.slug, (err, products)=>{

		db.query("SELECT * FROM categories", (err, categories)=>{

			categories = [
				categories[0],
				categories[1],
				categories[2],
				categories[3],
				categories[4],
				categories[6],
				categories[7],
				categories[8],
				categories[5] //others
			];

			db.query("SELECT * FROM products WHERE slug = ?" ,req.params.slug, (err, product)=>{
				db.query("SELECT * FROM extras WHERE category_id = ?", product[0].category_id, (err, extras)=> {
					db.query("SELECT * FROM sub_products", (err, sp)=> {
						db.query("SELECT * FROM flavours WHERE category_id = ?",product[0].category_id, (err, flavours)=> {
							res.render("main/product", 
								{
									pageTitle : `${product[0].name.toUpperCase()} - Vita Fruity. Healthy Food, Made Fresh Daily`, 
									products : products,
									product :  product[0],
									categories : categories,
									flavours : flavours || [],
									subProducts : sp,
									extras : extras
								});	
							});						
					});
				});	
			});
		});
	});	
}


module.exports.Category = (req, res)=> {	
	db.query("SELECT * FROM categories" , (err, categories)=>{

			categories = [
				categories[0],
				categories[1],
				categories[2],
				categories[3],
				categories[4],
				categories[6],
				categories[7],
				categories[8],
				categories[5] //others
			];


		let category = categories.find(c => c.slug === req.params.slug); // find category by slug

		db.query("SELECT * FROM products WHERE category_id = ?", category.id , (err, products)=>{
			db.query("SELECT * FROM sub_products ",  (err, sp)=> {

				db.query("SELECT * FROM extras",  (err, extras)=> {	
					db.query("SELECT * FROM flavours",  (err, flavours)=> {	

					let p = [];	
					for (var i = 1; i < products.length; i++) {
						let productHasSubProduct = sp.find(x => x.product_id === products[i].id);

						if (productHasSubProduct) {
							p.push(products[i]);	
						}
					}					

					res.render("main/categories", 
						{
							pageTitle : `${category.name.toUpperCase()} - Vita Fruity. Healthy Food, Made Fresh Daily`, 
							products : p,
							category : category,
							categories : categories,
							extras : extras,
							flavours : flavours,
							subProducts : sp
						});
					});	
				});
			});
		});	
	});	
}


module.exports.Search = (req, res)=> {	
	db.query("SELECT * FROM categories" , (err, categories)=>{
			categories = [
				categories[0],
				categories[1],
				categories[2],
				categories[3],
				categories[4],
				categories[6],
				categories[7],
				categories[8],
				categories[5] //others
			];


		db.query("SELECT * FROM products WHERE name LIKE N? " , ['%'+req.query.s+'%'], (err, products)=>{
			db.query("SELECT * FROM sub_products ",  (err, sp)=> {
				db.query("SELECT * FROM extras",  (err, extras)=> {	

					db.query("SELECT * FROM flavours",  (err, flavours)=> {	
						let p = [];	
						for (var i = 1; i < products.length; i++) {
							let productHasSubProduct = sp.find(x => x.product_id === products[i].id);

							if (productHasSubProduct) {
								p.push(products[i]);	
							}
						}

						res.render("main/search", 
							{
								pageTitle : `${req.query.s} - Search - Vita Fruity. Healthy Food, Made Fresh Daily`,
								products : p,
								categories : categories,
								query : req.query.s,
								subProducts : sp,
								extras : extras
							});
					});	
				});
			});	

		});	
	});	
}
