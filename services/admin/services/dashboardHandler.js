/*
*This service handles each page route
*/



const db = require('../../../database/config');

//Dashboard entry point
module.exports.Index = (req, res) => {
	res.render("dashboard/login");
}



/*
* All handler methods below are protected if user is logged in
*/


// Home page
module.exports.Home = (req, res) => {

	let orderIsDelivered = false;

	db.query("SELECT * FROM all_orders WHERE is_delivered IS NULL ORDER BY time_added DESC LIMIT 7" , (err, allOrders)=>{	
		db.query("SELECT * FROM product_orders" , (err, productOrders)=>{
			if (err) { throw new Error (err);}

			res.render("dashboard/index",
			 {
			 	pageTitle:`Home - Dashboard (${req.session.adminUsername}))`,
			 	orders : (allOrders.length > 0) ? allOrders : null,
			 	productOrders : productOrders
			 });
		});
				
	});

}



// Orders page 
module.exports.OrderList = (req, res) => {
	res.render("dashboard/order_list", {pageTitle:`Orders`});
}


// Products page  
module.exports.ProductList = (req, res) => {


	db.query('SELECT * FROM products ORDER BY id DESC', (err, row)=> {
		db.query('SELECT * FROM categories ORDER BY id ASC', (err, categories)=> {
			res.render("dashboard/products", {pageTitle:`Products`, products: row, categories : categories}); 
		});
	  	
	});	
	
}

// Add product page  
module.exports.AddProduct = (req, res) => {

	db.query('SELECT * FROM categories ORDER BY id DESC', (err, row)=> {
	  	res.render("dashboard/create_product", {pageTitle:`Add product`, categories : row});
	});
}



// Edit product page  
module.exports.EditProduct = (req, res) => {
	id = req.params.key;
	

	db.query('SELECT * FROM products WHERE id = ? ORDER BY id DESC', [id],(err, product)=> {
		if (product.length > 0) {
			
			db.query('SELECT * FROM categories ORDER BY id ASC', (err, categories)=> {

				if (categories.length > 0) {
					res.render("dashboard/edit_product", 
						{
							pageTitle:`Edit products - ${product[0].name}`, 
							product: product[0],
							categories : categories 
					});
				}

				
			});
		} else {
	  		 res.redirect("/dashboard/404");
		}
	});

}



// Categories page  
module.exports.Categories = (req, res) => {
	db.query('SELECT * FROM categories ORDER BY id DESC', (err, row)=> {
	  	res.render("dashboard/categories", {pageTitle:`Categories`, categories : row});
	});
}

// Add Category page  
module.exports.AddCategory = (req, res) => {
	res.render("dashboard/create_category", {pageTitle:`Add category`});
}


// Edit Category page  
module.exports.EditCategory = (req, res) => {
	let id = req.params.key;
	db.query('SELECT * FROM categories WHERE id = ?', id, (err, row)=> {

		if (row.length > 0) {
			res.render("dashboard/edit_category", 
				{
					pageTitle:`Edit category - ${row[0].name}`,
					category : row[0]
			});
		} else {
			res.redirect("/dashboard/404");
		}
	});

}


// Customer Order page  
module.exports.CustomerOrder = (req, res) => {
	db.query("SELECT * FROM products", (err, products)=> {
		db.query("SELECT * FROM all_orders WHERE order_key = ?", req.params.order_key, (err, allOrders)=> {
			db.query("SELECT * FROM product_orders WHERE order_key = ?", req.params.order_key, (err, productOrders)=> {

				let order = allOrders[0];

				res.render("dashboard/order", 
					{
						pageTitle : `Order - ${req.params.order_key} -Dashboard`, 
						order : order,
						key : req.params.order_key,
						productOrders : productOrders,
						products : products
					});
			});	
		})
	});
}




// New orders
module.exports.NewOrders = (req, res) => {

	let orderIsDelivered = false;

	db.query("SELECT * FROM all_orders WHERE is_delivered IS NULL ORDER BY time_added DESC" , (err, allOrders)=>{	
		db.query("SELECT * FROM product_orders" , (err, productOrders)=>{
			if (err) { throw new Error (err);}

			res.render("dashboard/new_orders_list",
			 {
			 	pageTitle:`New orders`,
			 	orders : (allOrders.length > 0) ? allOrders : null,
			 	productOrders : productOrders
			 });
		});
				
	});

}