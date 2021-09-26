const mongoose = require('mongoose');

const dealSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  value: Number,
  prefContact: String, // Email, contact number
  contact: String,
  status: { type: String, default: 'Pending' }, // Pending, Accepted, Declined, Done
  delStatus: { type: Boolean, default: false } 
});

module.exports = mongoose.model('Deal', dealSchema);
