require('dotenv').config();
const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10,
  host     : process.env.DB_HOST,
  port     : process.env.DB_PORT,
  user     : process.env.DB_USER,
  password : process.env.DB_PW,
  //socket   : '/Applications/MAMP/tmp/mysql/mysql.sock',
  database : process.env.DB_NAME
})

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }    
    if (connection)  {
        console.log('DB connected :)');
        connection.release()  
      }  
       
        return
})

module.exports = pool