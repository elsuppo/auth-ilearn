const UserModel = require('../models/UserModel');

module.exports.getUsers = async(req, res) => {
  try {
    const users = await UserModel.find();

    return res.json(users);

  } catch (error) {
    console.log(error);
  }
}