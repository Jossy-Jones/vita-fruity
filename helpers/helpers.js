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
