const jwt = require('jsonwebtoken');
const config = require('../db');
const morgan = require('morgan');

module.exports = (req, res, next) => {
  jwt.verify(req.get('Authorization'), config.secret, (err, decoded) => {
    if(!err) {
      req.decoded = decoded;
      next();
    } else {
      console.log(err);
      if(err.name === 'TokenExpiredError') {
        return res.status(498).json({success: false, error: "Token is expired!"});
      }
      return res.status(401).json({success: false, error: "Autentification failed!"});
    }
  })
}
