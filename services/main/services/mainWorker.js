/*
*This service handles each request to the /json route point
*/
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const Router  = require('router');
const bcrypt = require('bcrypt');
const session = require('express-session');
const slug = require('slug')

const db = require('../../../database/config');
const helpers = require('../../../helpers/helpers');


/*
* All  methods below are protected if user is logged in
*/



module.exports.LocationZoneStore = (req, res) => {
    db.query("SELECT * FROM zones", (err, zones) => {
        let status = false;
        let zoneDataCrypt = [];
        
        if(!req.session.zoneDataCrypt) {
            for (let i = 0; i < zones.length; i++) {
                zoneDataCrypt[i] = helpers.encrypt([zones[i].name, zones[i].description, zones[i].price]);
             }
             req.session.zoneDataCrypt = zoneDataCrypt;    
        }

        req.session.save(); 

       if(req.session.zoneDataCrypt) {
           status = true;
       }      
    
        return res.json({
            status: status,
            zoneDataCrypt: req.session.zoneDataCrypt 
        });
    });
}
