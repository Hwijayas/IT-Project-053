const mongoose = require('mongoose');
const Deal = require('../models/deal');
const Customer = require('../models/customer');
const customerController = require('./customerController');

// Function to create deals
const userCreateDeal = async (req, res) => {
  const customer = await customerController.addCustomer(req.body.customer, req.user._id);

  // https://stackoverflow.com/questions/33305623/mongoose-create-document-if-not-exists-otherwise-update-return-document-in
  const query = {
    dealName: req.body.dealName,
    value: req.body.value,
    customer: customer._id,
  };
  const update = {
    dealName: req.body.dealName,
    value: req.body.value,
    customer: customer._id,
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  // Find the document or create one
  const deal = await Deal.findOneAndUpdate(query, update, options);

  // Add the user if not present
  deal.user.indexOf(req.user._id) === -1 ? deal.user.push(req.user._id) : console.log('user already exists');
  deal.save();

  return res.status(201).json({ success: true, msg: 'Deal created!', deal });
};

// Function to update deals
const userUpdateDeal = async (req, res) => {
  const deal = await Deal.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { dealName: req.body.dealName, value: req.body.value },
    { new: true },
  );

  if (deal === null) {
    res.status(400).json({ success: false, msg: 'Deal not found!' });
  } else {
    const customer = await customerController.updateCustomer(deal.customer,
      req.user._id, req.body.customer);
    res.status(200).json({
      success: true, msg: 'Deal updated!', deal, customer,
    });
  }
};

// Function to delete deals
const userDeleteDeal = (req, res) => {
  const dealId = req.params.id;
  Deal.findOneAndDelete({ _id: dealId, user: req.user._id }, (err, deal) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else if (deal != null) {
      res.status(200).json({ success: true, msg: 'Deal deleted!' });
    } else {
      res.status(404).json({ success: false, msg: 'Deal not found!' });
    }
  });
};

const updateDealStatus = (req, res) => {
  const dealId = req.params.id;
  const newStatus = req.body.status;
  Deal.findOneAndUpdate({ _id: dealId }, { status: newStatus }, (err, deal) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else if (deal != null) {
      res.status(200).json({ success: true, msg: 'Deal status updated!' });
    } else {
      res.status(404).json({ success: false, msg: 'Deal not found!' });
    }
  });
};

module.exports.userCreateDeal = userCreateDeal;
module.exports.userUpdateDeal = userUpdateDeal;
module.exports.userDeleteDeal = userDeleteDeal;
module.exports.updateDealStatus = updateDealStatus;
