const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: maxAge,
  });
};

const updateLastLoginDate = (id) => {
  UserModel.findOneAndUpdate({_id: id}, {dateLastLogin: new Date()}, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`login user: ${data}`);
    }
  })
}

const handleErrors = (error) => {
  let errors = { name: '', email: '', password: '' };
  if (error.message === 'incorrect email') {
    errors.email = 'that email is not register';
    return errors;
  }
  if (error.message === 'incorrect password') {
    errors.password = 'that password is incorrect';
    return errors;
  }
  if (error.code === 11000) {
    errors.email = 'user with this email already exists';
    return errors;
  }
  if (error.message.includes('Users validation failed')) {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
}

module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });
    const token = createToken(user._id);
    res.status(201).json({ user: user._id, created: true, token });
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);
    updateLastLoginDate(user._id);
    res.status(200).json({ user: user._id, status: true, token})
  } catch (error) {
    console.log(error);
    const errors = handleErrors(error);
    res.json({ errors, status: false });
  }
};
