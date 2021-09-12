const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  name: String,
  company: String,
  email: String,
  phone: String,
});

module.exports = mongoose.model('Customer', customerSchema);
