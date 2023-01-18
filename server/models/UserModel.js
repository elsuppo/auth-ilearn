const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {type: String, required: [true, 'name is required']},
  email: {type: String, required: [true, 'email is required'], unique: true},
  password: {type: String, required: [true, 'password is required']},
})

userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('Users', userSchema);