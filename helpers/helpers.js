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