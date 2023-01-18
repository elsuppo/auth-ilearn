const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({id}, 'andrew_supo_secret_key', {
    expiresIn: maxAge,
  });
};

const handleErrors = (error) => {
  let errors = {name: '', email: '', password: ''};

  if (error.code === 11000) {
    errors.email = 'user with this email already exists';
    return errors;
  }

  if (error.message.includes('Users validation failed')) {
    Object.values(error.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

}

module.exports.register = async (req, res, next) => {
  try {
    const {name, email, password} = req.body;
    const user = await UserModel.create({name, email, password});
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000
    });
    res.status(201).json({user:user._id, created: true})
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.json({errors, created: false});
  }
};

module.exports.login = async (req, res, next) => {};
