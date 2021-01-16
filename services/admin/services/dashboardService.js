/*
*This service handles each request to the /json route point
*/
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const Router  = require('router');
const bcrypt = require('bcrypt');
const session = require('express-session');
const slug = require('slug')

const db = require('../../../database/config');


/*
* All  methods below are protected if user is logged in
*/



module.exports.test = (req, res) => {
	//example
	var post  = {id: 1, title: 'Hello MySQL'};
	var query = connection.query('INSERT INTO posts SET ?', post, (err, row)=> {
	  // Neat!
	});
}


module.exports.createCategory = async (req, res) => {
	let imgName = req.body.images;
	let categoryName = req.body.name;

	let category  = {
		id: null, 
		name: categoryName,
		main_img: imgName, 
		slug : slug(categoryName.toLowerCase()),
		time_added : Date.now()
	}

	 db.query("SELECT * FROM categories WHERE name = ?", [categoryName], (err, row)=> {
	 	// failed
  		if (row.length > 0) {
  			res.json({message:"Choose another category name", status : false});

			try {
  				fs.unlinkSync(`public/img/categories/${imgName}`);
  			} catch (e) {
  				console.log(e);
  			}  

  		} else {
  			// success
	  		db.query('INSERT INTO categories SET ?', category, (err, row)=> {
				res.json({message:"Category added", status : true});
			});	
  		}
	});

}



module.exports.createProduct = async (req, res) => {
	let imgName = req.body.images;
	let productName = req.body.name;
	let categoryId = parseInt(req.body.category);
	let description = req.body.description;


	let product = {
		id: null, 
		name: productName,
		main_img: imgName,
		category_id : categoryId, 
		slug : slug(productName.toLowerCase()),
		description : description,
		time_added : Date.now()
	}

	console.log(product);

	let status = false;
	let message = null;

	 db.query("SELECT * FROM products WHERE name = ?", [productName], (err, row)=> {

  		if (row.length > 0) {
  			message = "Choose another product name";
  		} else if (productName.length == 0){
  			message = "Please your product name cannot be empty";
  		} else if (description.length == 0) {
  			message = "Please your product description cannot be empty";
  		} else {
  			status = true;
  			message = "Product added";
  		}

  		//failed
  		if (status == false) {
  			if (req.body.chkImg !== 'IMAGE_CHANGED') {
	  			try {
	  				fs.unlinkSync(`public/img/products/${imgName}`);
	  			} catch (e) {
	  				console.log(e);
	  			}
  			}
  			res.json({message: message,  status: status});
  		} else {
  			// success
	  		db.query('INSERT INTO products SET ?', product, (err, isInserted)=> {
	  			if (err) {
	  				throw new Error (err);
	  			}
	  			if (isInserted) {
	  				res.json({message:  message, status: status});
	  			}
			});	  		
	  	}


	});	

}



module.exports.modifyProduct = async (req, res) => {
	let productId = req.body.id;
	let imgName =   (req.body.chkImg === "IMAGE_CHANGED") ? req.body.images : req.body.chkImg;
	let productName = req.body.name;
	let categoryId = parseInt(req.body.category);
	let price = parseInt(req.body.price);
	let description = req.body.description;


	console.trace(req.body.images);

	let product = { 
		name: productName,
		main_img: imgName,
		category_id : categoryId, 
		slug : slug(productName.toLowerCase()),
		description : description,
		time_updated : Date.now()
	}

	let status = false;
	let message = null;


	 db.query("SELECT * FROM products WHERE  name = ?", [productName], (err, row)=> {

	 	if (err) { throw new err; }

	 	if (row.length > 0) {
	 	  const oldImg = row[0].main_img; // old image name
	 	}	

	 	



  		if (row.length > 0 && row[0].id != productId) {
  			message = "Choose another product name";
  		} else if (productName.length == 0){
  			message = "Please your product name cannot be empty";
  		} else if (description.length == 0) {
  			message = "Please your product description cannot be empty";
  		} else if (price < 500){
  			message = "Price should not be less than 500";
  		} else {
  			status = true;
  			message = "Product modified";
  		}

  		//failed
  		if (status == false) {
  			// deleting temporary image is not changed
  			if (req.body.chkImg !== 'IMAGE_CHANGED') {
	  			try {
	  				fs.unlinkSync(`public/img/products/${imgName}`);
	  			} catch (e) {
	  				console.log(e);
	  			}
  			}
  			
  			res.json({message: message,  status: status});
  		} else {
  			// success
	  		db.query('UPDATE products SET ? WHERE id = ?', [product, productId], (err, isUpdated)=> {
	  			if (err) throw new Error(err);

	  			if (isUpdated) {	
		  			if (req.body.chkImg === 'IMAGE_CHANGED') {
				  			try {
				  				console.log("deleted old product image");
				  				fs.unlinkSync(`public/img/products/${oldImg}`);
				  			} catch (e) {
				  				console.log(e);
				  			}
					}
					res.json({message:  message, status: status});			
	  			}
			});	  		
	  	}


	});	

}

module.exports.modifyCategory = (req, res)=> {
	let imgName =   (req.body.chkImg === 'IMAGE_CHANGED') ? req.body.images : req.body.chkImg;
	let categoryName = req.body.name;
	let categoryId = req.body.id;


	let category = {
		name : categoryName,
		main_img : imgName,
		time_updated : Date.now()
	}

	 db.query("SELECT * FROM categories WHERE id = ?", [categoryId], (err, row)=> {
	 	if (err) { throw new err; }
	 	
	 	if (row.length > 0) {
	 	  const oldImg = row[0].main_img; // old image name
	 	}	

	 	

  		if (row.length > 0 && row[0].id != categoryId) {
  			message = "Choose another category name";
  		} else {
  			status = true;
  			message = "Category modified";
  		}

  		//failed
  		if (status == false) {
  			// deleting temporary image

  			if (req.body.chkImg !== 'IMAGE_CHANGED') {
	  			try {
	  				fs.unlinkSync(`public/img/categories/${imgName}`);
	  			} catch (e) {
	  				console.log(e);
	  			}
  			}
  			
  			res.json({message: message,  status: status});
  		} else {
  			// success
	  		db.query('UPDATE categories SET ?  WHERE id = ?', [category, categoryId], (err, isUpdated)=> {
	  			if (err) throw new Error(err);
	  			
		  			if (req.body.chkImg === 'IMAGE_CHANGED') {
				  			try {
				  				console.log("deleted old product image");
				  				fs.unlinkSync(`public/img/categories/${oldImg}`);
				  			} catch (e) {
				  				console.log(e);
				  			}
				  			
					}
					res.json({message:  message, status: status});
			});	  		
	  	}


	});	

}



module.exports.setOrderAsDelivered = (req, res) => {
	// 1) Set is_delivered to 1 in all_orders table

	// 2) insert order data to delivered_orders

	let order = {
		id : null,
		order_key : req.body.order_key,
		time_added : Date.now()
	}

	db.query("INSERT INTO delivered_orders SET ?", order, (err, isInserted)=>{
		if (err) throw new Error(err);

			db.query("UPDATE all_orders SET is_delivered = 1 WHERE order_key =  ?",[req.body.order_key], (err, isUpdated)=>{
					if (err) throw new Error(err);

					return	res.json({message:  `Order ${req.body.order_key} marked as delivered`, status: true});
			});

	});		
}


module.exports.createSubProduct = (req, res) => {
	let subProduct  = {
		id: null, 
		name: req.body.name,
		price: req.body.price,
		product_id : req.body.productId,
		time_added : Date.now()
	};

	db.query('INSERT INTO sub_products SET ?', subProduct, (err, isCreated)=> {
	  if (err) throw new Error(err);

	  if (isCreated) {
	  	res.json({message:"Sub product added", status:true});
	  }

	});
}


module.exports.modifySubProduct = (req, res) => {
	let subProduct  = {
		name: req.body.name,
		price: req.body.price,
		time_updated : Date.now()
	};

	db.query('UPDATE sub_products SET ? WHERE id =?', [subProduct, req.body.subId], (err, isModified)=> {
	  if (err) throw new Error(err);

	  if (isModified) {
	  	res.json({message:"Sub product modified", status:true});
	  }
	});
}

module.exports.deleteSubProduct = (req, res) => {
	db.query('DELETE FROM `sub_products` WHERE id = ? ', [req.body.id], (err, isDeleted)=> {
	  if (err) throw new Error(err);

	  if (isDeleted) {
	  	res.json({message:"Sub product deleted", status:true});
	  }
	});
}


module.exports.deleteProduct = (req, res) => {
	db.query('DELETE FROM `products` WHERE id = ? ', [req.body.id], (err, isDeleted)=> {
		db.query('DELETE FROM `sub_products` WHERE product_id = ? ', [req.body.id], (err, isDeleted)=> {
			if (err) throw new Error(err);

			if (isDeleted) {
				res.json({message:"Product deleted", status:true});
			}
		});

	});
}

