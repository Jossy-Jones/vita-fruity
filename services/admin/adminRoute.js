const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
const  {uuid}  = require('uuidv4');


const db = require('../../database/config');

//handler
const dashboardHandler = require("../admin/services/dashboardHandler");

//service
const dashboardService = require("../admin/services/dashboardService"); 
const authService = require("../admin/services/authService"); 

//middlewares
const adminMiddleware = require('../../middlewares/adminMiddleware');
const fileUploadMiddleware = require('../../middlewares/fileUploadMiddleware');




//Tests
route.get("/test", (req, res)=> {
	console.log(Date.now());
});



//Unprotected routes
route.get('/', adminMiddleware.notLoggedIn,dashboardHandler.Index);

route.get('/login', adminMiddleware.notLoggedIn, dashboardHandler.Index);


//Protected routes
route.get('/home', adminMiddleware.isLoggedIn,  dashboardHandler.Home);

route.get('/orders', adminMiddleware.isLoggedIn, dashboardHandler.OrderList);

route.get('/order-menu', adminMiddleware.isLoggedIn, dashboardHandler.OrderMenu);


route.get('/products', adminMiddleware.isLoggedIn, dashboardHandler.ProductList);

route.get('/add-product', adminMiddleware.isLoggedIn, dashboardHandler.AddProduct);

route.get('/edit-product/:key', adminMiddleware.isLoggedIn, dashboardHandler.EditProduct);


route.get('/add-sub-product/:id', adminMiddleware.isLoggedIn, dashboardHandler.AddSubProduct);


route.get('/edit-sub-product/:id', adminMiddleware.isLoggedIn, dashboardHandler.EditSubProduct);


route.get('/categories', adminMiddleware.isLoggedIn, dashboardHandler.Categories);


route.get('/add-category', adminMiddleware.isLoggedIn, dashboardHandler.AddCategory);


route.get('/edit-category/:key', adminMiddleware.isLoggedIn, dashboardHandler.EditCategory);

route.get('/customer-order/:order_key', adminMiddleware.isLoggedIn, dashboardHandler.CustomerOrder);

route.get('/orders/new', adminMiddleware.isLoggedIn, dashboardHandler.NewOrders);

route.get('/orders/delivered', adminMiddleware.isLoggedIn, dashboardHandler.DeliveredOrders);

route.get("/logout", adminMiddleware.logout);

//error 404
route.get("/*", adminMiddleware.isLoggedIn , (req, res) =>{ res.render("dashboard/404") });


//Authentication route point
route.post('/json/auth', authService);


//Dashboard service api route point
route.post('/json/test',  dashboardService.test);
route.post('/json/order/add/delivered',  dashboardService.setOrderAsDelivered);
route.post('/json/product/sub/create',  dashboardService.createSubProduct);
route.post('/json/product/sub/modify',  dashboardService.modifySubProduct);
route.post('/json/product/sub/delete',  dashboardService.deleteSubProduct);

route.post('/json/add-category', 
	adminMiddleware.protectEndpoint,
	(req, res, next)=> {
		// setting  essential upload parameters for category
		req.session.uploadPath = "img/categories";	
		req.session.imgQuality = 75;
		next();
			
	}, 
	fileUploadMiddleware.uploadImages,
	fileUploadMiddleware.resizeImages,
	dashboardService.createCategory,

);


route.post('/json/add-product', 
	adminMiddleware.protectEndpoint,
	(req, res, next)=> {
		// setting  essential upload parameters 
		req.session.uploadPath = "img/products";	
		req.session.imgQuality = 75;
		next();
			
	}, 
	fileUploadMiddleware.uploadImages,
	fileUploadMiddleware.resizeImages,
	dashboardService.createProduct,
);



route.post('/json/edit-product', 
	adminMiddleware.protectEndpoint,
	(req, res, next)=> {
		// setting  essential upload parameters 
		req.session.uploadPath = "img/products";	
		req.session.imgQuality = 75;
		next();
			
	}, 
	fileUploadMiddleware.uploadImages,
	fileUploadMiddleware.resizeImages,
	dashboardService.modifyProduct,
);



route.post('/json/edit-category', 
	adminMiddleware.protectEndpoint,
	(req, res, next)=> {
		// setting  essential upload parameters 
		req.session.uploadPath = "img/categories";	
		req.session.imgQuality = 75;
		next();
			
	}, 
	fileUploadMiddleware.uploadImages,
	fileUploadMiddleware.resizeImages,
	dashboardService.modifyCategory,
);


module.exports = route;