const jwt = require('jsonwebtoken');

// Create a middleware for private routes
module.exports = function(req, res, next){
    const token = req.header('auth-token');
    console.log(token);
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verify = jwt.verify(token, process.env.TOKEN);
        req.user = verify;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
  }