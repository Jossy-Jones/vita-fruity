const path = require("path");
const express = require("express");
const app = express();
const Router  = require('router');
const bcrypt = require('bcrypt');
const session = require('express-session');


const db = require('../../../database/config');

const authService = (req, res)=>{ 
  let username = req.body.username;
  let password = req.body.password;


  db.query("SELECT * FROM admin WHERE username = ?", [username], function (err, row, fields) {

    if (row === undefined || row.length == 0) {
      res.json({error: "Invalid details", status : false});
    } else {
      // Salt rounds is 11
       bcrypt.compare(password, row[0].password, function(err, isMatch) {
        if (err) {
          throw err;
        } else if (!isMatch) {
          res.json({message:"Password does not match", status : false});
        } else {
          res.json({message:"Password matches", status : true});
          req.session.adminUsername = row[0].username;
          req.session.save();
        }
      });
    }

    });
}


module.exports = authService;