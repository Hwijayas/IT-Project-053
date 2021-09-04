const mongoose = require('mongoose');
const Deal = require('../models/deal');

// Function to create deals
const userCreateDeal = async (req, res) => {
  try {
    Deal.find({
      name: req.body.name,
      // eslint-disable-next-line no-underscore-dangle
      user: req.user._id,
      value: req.body.value,
      prefContact: req.body.prefContact,
      contact: req.body.contact,
      // eslint-disable-next-line consistent-return
    }).exec()
      // eslint-disable-next-line consistent-return
      .then((data) => {
        if (data.length >= 1) {
          return res.status(422).json({
            message: 'Deal already exists',
            deal: data,
          });
        }
        const newDeal = new Deal({
          _id: new mongoose.Types.ObjectId(),
          // eslint-disable-next-line no-underscore-dangle
          user: req.user._id,
          name: req.body.name,
          value: req.body.value,
          prefContact: req.body.prefContact,
          contact: req.body.contact,
        });

        newDeal.save()
          .then(() => {
            res.status(201).json({ success: true, msg: 'Deal created!', deal: newDeal });
          })
          .catch((error) => {
            console.log(error);
          });
      });

    res.status(201);
  } catch (error) {
    console.log(error);
  }
};

// Function to update deals
const userUpdateDeal = (req, res) => {
  const dealId = req.params.id;
  const newName = req.body.name;
  const newValue = req.body.value;
  const newPrefContact = req.body.prefContact;
  const newContact = req.body.contact;

  Deal.findOneAndUpdate({ _id: dealId }, {
    name: newName, value: newValue, prefContact: newPrefContact, contact: newContact,
  }, { new: true }, (err, deal) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else if (deal != null) {
      res.status(200).json({ success: true, msg: 'Deal updated!' });
    } else {
      res.status(404).json({ success: false, msg: 'Deal not found!' });
    }
  });
};

// Function to delete deals
const userDeleteDeal = (req, res) => {
  const dealId = req.params.id;
  Deal.findOneAndDelete({ _id: dealId }, (err, deal) => {
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
