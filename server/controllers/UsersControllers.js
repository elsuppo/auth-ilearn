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

module.exports.deleteUsers = async(req, res) => {
  const selectedUsersId = Object.values(req.query);
  console.log('delete');
  selectedUsersId.forEach(userId => {
    UserModel.findOneAndDelete({_id: userId}, (error, data) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`delete user: ${data}`);
        }})
  })
  const users = await UserModel.find();
  return res.json(users);
}