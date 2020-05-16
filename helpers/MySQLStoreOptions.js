require('dotenv').config();
const options = {
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PW,
  database : process.env.SESSION_DB,
  connectionLimit: 10,
  clearExpired: true
}

module.exports = options;