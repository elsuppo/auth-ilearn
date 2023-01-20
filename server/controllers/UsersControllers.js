const UserModel = require('../models/UserModel');

module.exports.getUsers = async(req, res) => {
  try {
    const users = await UserModel.find();
    console.log('get users done');
    return res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'failed to get users'
    })
  }
}