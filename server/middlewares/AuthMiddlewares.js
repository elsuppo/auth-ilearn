const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

module.exports.checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(req.cookies.jwt);
  if (token) {
    jwt.verify(token, 'andrew_supo_secret_key', async (error, decodedToken) => {
      if (error) {
        res.json({status: false});
        next();
      } else {
        const user = await User.findById(decodedToken.id);
        if (user) {
          res.json({status: true, user: user.email});
        } else {
          res.json({status: false});
          next();
        }
      }
    });
  } else {
    res.json({status: false});
    next();
  }
}