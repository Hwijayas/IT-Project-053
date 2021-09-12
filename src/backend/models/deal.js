const mongoose = require('mongoose');

const dealSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  dealName: String,
  value: Number,
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  status: { type: String, default: 'Pending' }, // Pending, Accepted, Declined, Done
});

module.exports = mongoose.model('Deal', dealSchema);
