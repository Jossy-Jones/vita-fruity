require('dotenv').config();
const path = require("path");
const express = require("express");
const app = express();
const Router  = require('router');
const session = require('express-session');
const minify = require('express-minify');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const compression = require('compression');
const port = 7171;

//Routes
const mainRoute = require("./services/main/mainRoute");
const adminRoute = require("./services/admin/adminRoute");

//Session
const MySQLStoreOptions = require("./helpers/MySQLStoreOptions");

router = Router();

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(session({
	name: process.env.SESSION_NAME,
	key : process.env.SESSION_KEY,
	secret: process.env.SESSION_SECRET, // secret key
	resave: false,
	saveUninitialized: true,
	store: new MySQLStore(MySQLStoreOptions),
	cookie: { 
		 secure: process.env.NODE_ENV == "production" ? true : false ,
		 maxAge: 24 * 60 * 60 * 1000,
		 sameSite: false
	}
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');


app.use(compression());
app.use(minify());

//setting general public path for app, dashboard route has no custom path
app.use(express.static(path.join(__dirname, "public")));

//setting custom public path for entry route
app.use("/",express.static(path.join(__dirname, "public/main")));


app.locals = {
    site: {
        title: 'Vita Fruity',
        author: 'Clinton Nzedimma',
        description: 'An ecommerce application',
    	url :process.env.SITE_URL,
    	adminURL :`${process.env.SITE_URL}/dashboard`,
    	paystackPK : process.env.PAYSTACK_PK
    },

    helpers : require("./helpers/helpers"),
    // I just removed the core module

};


//admin dashboard route
app.use("/dashboard", adminRoute);

// entry route
app.use("/", mainRoute);




app.listen(port, () =>{
  console.log('Vita Fruity app listening on port '+port+'!' );
});