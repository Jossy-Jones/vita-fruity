const { uuid } = require('uuidv4');

const db = require('../../../database/config');
const Cart = require('../../../models/cart');
const helpers = require('../../../helpers/helpers');
const paystackPayment = require('../../../helpers/paystackPayment');

module.exports.saveCustomerDetails = (session, cart, txn_ref = null) => {
	return new Promise ((resolve, reject)=> {
		let details =  {
			id : null,
			order_key : session.order.key,
			amount : cart.totalPrice,
			customer_name : `${session.order.customer_name}`,
			customer_phone : `${session.order.customer_phone}`,
			customer_email : `${session.order.customer_email}`,
			address : session.order.address,
			is_not_pip : session.order.is_not_pip,
			add_info : (session.order.addInfo) ? session.order.addInfo : null,
			shipping_method : (session.order.shippingMethod) ? session.order.shippingMethod : null,
			pickup_time : session.order.pickupTime,
			time_added : Date.now(),
			zone_name : (session.order.zone_name) ? session.order.zone_name : null ,
			zone_desc :  (session.order.zone_desc) ? session.order.zone_desc : null ,
			zone_price :  (session.order.zone_price) ? 	session.order.zone_price : null		
		}
		let cartProducts = cart.getItemsForOrder(session.order.key);
		let cartExtras  = (cart.getExtraOrders().length > 0) ? cart.getExtraOrders() : [];

		db.query("INSERT INTO all_orders SET ?", details, (err, orderInsert)=>{
			if (err) {
				reject("Couldnt insert customer details");
			}else {
				db.query("INSERT INTO product_orders (id, order_key, product_order_key, product_id, sub_product_id, time_added, price, qty, discount_code, discount_percent) VALUES ? ", [cartProducts],(err, productOrderInsert)=> {
					if (err) {
						reject("Couldnt insert products orders from cart");
					} else {
						if (txn_ref === null) {
							resolve("Inserted all !");
						}else {
							details.txn_ref = txn_ref;
							details.payment_type = "online";

							db.query("INSERT INTO paid_orders SET ?", details, (err, paidOrderInsert)=>{
								console.log(err);
								if (err) {
									reject("Couldnt insert customer details into paid orders")
								} else {

									console.log("Paid orders Inserted");

									console.log(cartExtras);


									if (cartExtras.length == 0) {
										console.log("Outside extras worked");
										resolve(session.order.key);
									} else if (cartExtras.length > 0) {
										console.log("Inside extras worked");
										db.query("INSERT INTO extra_orders (id, product_order_key, price, time_added,  name) VALUES ?", [cartExtras], (err, extraInsert)=>{

											if (extraInsert) {
												console.log(" Insert Inside extras worked");
												 resolve(session.order.key);	
											}			
										});
									}

										
										
								}
							});
						}
						
					}

				});
			}
		});
	});
}	



module.exports.saveMealPlanOrder = (sessionData, amt,  txn_ref = null) => {
	let mealKey = uuid().toUpperCase().slice(0, 5);

	return new Promise ((resolve, reject)=> {
		let order =  {
			id : null,
			amount : amt/100,
			meal_plan_slug : sessionData.meal_plan_slug,
			meal_plan_name : sessionData.meal_plan_name,
			meal_key: mealKey,
			customer_name : `${sessionData.firstName} ${sessionData.firstName.toUpperCase()}`,
			customer_phone : `${sessionData.phone}`,
			customer_email : `${sessionData.email}`,
			address : sessionData.address,
			allergies : sessionData.allergies,
			expectant_mum : (sessionData.expectant_mum) ? sessionData.expectant_mum : null,
			add_info : (sessionData.addInfo) ? sessionData.addInfo : null,
			pickup_time : sessionData.pickupTime,
			time_added : Date.now(),
			start_time : new Date(sessionData.start_time).getTime(),
			txn_ref : txn_ref		
		}


		db.query("INSERT INTO meal_plan_orders SET ?", order, (err, isInserted)=> {
				if (err) reject(err);				
				if (isInserted) resolve(mealKey);
		});
	});
}