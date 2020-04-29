const axios = require('axios');

module.exports.init = (ref, sk)=> {
	return new Promise((resolve, reject)=> {
		 axios({
		  method: 'get', //you can set what request you want to be
		  url: `https://api.paystack.co/transaction/verify/${ref}`,
		  headers: {
		  	'Content-Type': 'application/json',
		    'Authorization': 'Bearer ' + sk
		  }
		}).then(res => {
			if(res.data.status == true)  resolve(res);
			else reject(res);
		}).catch(err =>{
			reject(err);
		});

	});
}