const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

module.exports.checkUser = async (req, res, next) => {
  try {
    const token = req.url.slice(9);
    if (token) {
      jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (error, decodedToken) => {
        if (error) {
          res.status(403).json({ message: 'no access' });
        } else {
          const user = await User.findById(decodedToken.id);
          if (user) {
            if (user.statusUser === 'blocked') {
              res.status(403).json({ message: 'no access' });
            } else {
              console.log('the user is verified');
              next();
            }
          } else {
            res.status(403).json({ message: 'no access' });
          }
        }
      });
    } else {
      res.status(403).json({ message: 'no access' });
    }
  } catch (error) {
    console.log(error);
  }
}