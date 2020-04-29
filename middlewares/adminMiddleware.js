module.exports.isLoggedIn = (req, res, next) => {
	if (req.session.adminUsername) {
		console.log(`Admin Middleware : Logged in as ${req.session.adminUsername}`);
		return next();
	} else {
		console.log("Admin Middleware : NOT Logged in");
		return res.redirect("/dashboard/");
	}
}


module.exports.notLoggedIn = (req, res, next) => {
	if (!req.session.adminUsername) {
		console.log("Admin Middleware : NOT Logged in");
		return next();
	} else {
		return res.redirect("/dashboard/home");
	}

}


module.exports.logout = (req, res) => {
	delete req.session.adminUsername;
	req.session.save();
	console.log("Logged out");
	console.log(req.session.adminUsername);
	return res.redirect("dashboard/");
}



//Protects Dashboard service endpoint
module.exports.protectEndpoint = (req, res, next) => {
	if(req.session.adminUsername) {
	   return next();
	}else {
		return res.json({message:"Authentication error", status : false});
	}
}