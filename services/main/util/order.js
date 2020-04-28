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
			is_not_pip : (session.order.isNotPip == 1) ? 1 : null,
			add_info : (session.order.addInfo) ? session.order.addInfo : null,
			shipping_method : (session.order.shippingMethod) ? session.order.shippingMethod : null,
			pickup_time : session.order.pickupTime,
			time_added : Date.now() 
		}

		let cartProducts = cart.getItemsForOrder(session.order.key);

		db.query("INSERT INTO all_orders SET ?", details, (err, orderInsert)=>{
			if (err) {
				reject("Couldnt insert customer details");
			}else {
				db.query("INSERT INTO product_orders (id, order_key, product_id, time_added, price, qty, discount_code, discount_percent) VALUES ? ", [cartProducts],(err, productOrderInsert)=> {
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
									db.query("UPDATE all_orders SET is_paid = 1 WHERE order_key = ?", details.order_key, (err, paidOrderInsert)=>{
										resolve(session.order.key);
									});	
								}
							});
						}
						
					}

				});
			}
		});
	});
}	