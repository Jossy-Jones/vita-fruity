const moment = require('moment');

module.exports.ucwords = (str) => {
 return (str + '')
    .replace(/^(.)|\s+(.)/g, function ($1) {
      return $1.toUpperCase()
    })
}



module.exports.formatTime = (time, format) => {
	return moment(time).format(format);
}



module.exports.pickupTimeRangeIsValid = (arg) => {
 	let start =  moment.utc("08:00","HH:mm:ss");
 	let end = moment.utc("20:00","HH:mm:ss");

    let m = moment.utc(arg, "HH:mm:ss");

    if (m.isAfter(start) && m.isBefore(end)) {
    	return true
    }
    return false;
}

module.exports.findMinMax = (arr) => {
	let lowest = Number.POSITIVE_INFINITY;
	let highest = Number.NEGATIVE_INFINITY;
	let tmp;
	for (let i=arr.length-1; i>=0; i--) {
	    tmp = arr[i].Cost;
	    if (tmp < lowest) lowest = tmp;
	    if (tmp > highest) highest = tmp;
	}
	return  {
		lowest : lowest,
		highest : highest
	}	
}


module.exports.validateEmail  = (email) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}