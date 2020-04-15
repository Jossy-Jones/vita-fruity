require('dotenv').config();
const mysql = require('mysql');
const db = mysql.createConnection({
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PW,
  //socket   : '/Applications/MAMP/tmp/mysql/mysql.sock',
  database : process.env.DB_NAME
});

db.connect(function(err) {
    if (err){
      console.log(err);
      //throw err;
    } else {
      console.log('DB connected :)');
    }
});

module.exports = db;

