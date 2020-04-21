const { uuid } = require('uuidv4');

const db = require('../../../database/config');
const Cart = require('../../../models/cart');
const helpers = require('../../../helpers/helpers');

module.exports.saveCustomerDetails = (arg, cart) => {
	return new Promise ((resolve, reject)=> {
		let details =  {
			id : null,
			order_key : uuid().toUpperCase().slice(0, 7),
			customer_name : `${arg.fullName.toUpperCase()} ${arg.lastName}`,
			customer_phone : `${arg.phone}`,
			customer_email : (arg.isNotPip) ? 1 : null,
			add_info : (arg.addInfo) ? arg.addInfo : null,
			shipping_method : (req.session.order.shippingMethod) ? req.session.order.shippingMethod : null,
			shipping_method : (req.session.order.shippingMethod) ? req.session.order.shippingMethod : null,
			pickup_time : (req.session.order.pickup_time) ? req.session.order.pickup_time : null  
		}

		let cartProducts = [];

		db.query("INSERT INTO all_orders SET ?", details, (err, success)=>{
			if (err) {
				reject(err)
			}else {
				resolve(success);	
			}
		});
	});
}	