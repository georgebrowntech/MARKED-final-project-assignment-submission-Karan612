const express = require('express');
const Admin = require('../model/Admin');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

const Adminroute = express.Router();

dotenv.config();

Adminroute.get('/register',verifyToken, (req, res)=> {
    res.send('Access Granted');
});

Adminroute.post('/login',(req, res) =>{

    // Checking if the email exists
    const admin = Admin.findOne({email: req.body.email, password: req.body.password}, function(err, found) {
        if(err){
            throw err;
        }
        
        if(!found){
          return res.send({ status: false });
        }
        else{
          const token = jwt.sign({_id: admin._id},process.env.TOKEN);
          res.header('auth_token', token);
          res.send({ status: true , token:process.env.TOKEN});
        }
    });
}) 

Adminroute.route('/add').post((req, res, next) => {
    Admin.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } 
      else {
        console.log('Added');
        res.json(data)
      }
    })
  });

Adminroute.route('/logout').get((req, res) => {
    const token = jwt.EMPTY;
    req.header('auth_token', token);
    res.send('Logged Out');
  });

  Adminroute.route('/get-user').get((req, res) => {
    Admin.find((error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

module.exports = Adminroute;