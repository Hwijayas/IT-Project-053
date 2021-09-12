const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  adminEmail: String,
  adminFirstName: String,
  adminLastName: String,
  hash: String,
  salt: String,
});

module.exports = mongoose.model('Admin', adminSchema);
