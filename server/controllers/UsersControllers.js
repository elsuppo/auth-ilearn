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

const updateStatusUsers = async (selectedUsersId, newStatus, oldStatus) => {
  await selectedUsersId.forEach(userId => {
    UserModel.findOneAndUpdate({_id: userId}, {statusUser: newStatus}, {new: true}, (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(oldStatus === 'active' ? `blocked user:  ${data}` : `unlocked user: ${data}`);
      }})
  })
}

module.exports.blockUsers = async(req, res) => {
  const selectedUsersId = req.body.users;
  const action = req.body.action;
  if (action === 'block') {
    updateStatusUsers(selectedUsersId, 'blocked', 'active');
  }
  if (action === 'unlock') {
    updateStatusUsers(selectedUsersId, 'active', 'blocked');
  }
  const users = await UserModel.find();
  return await res.json(users);
}