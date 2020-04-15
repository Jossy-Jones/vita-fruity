/*
*This service handles each page route
*/

const slug = require('slug');

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
	res.render("dashboard/index", {pageTitle:`Home - Dashboard (${req.session.adminUsername}))`});

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
	res.render("dashboard/order", {pageTitle:`A single order`, key: req.params.order_key});
}