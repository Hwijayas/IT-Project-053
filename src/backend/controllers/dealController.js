const mongoose = require('mongoose');
const Deal = require('../models/deal');
const Customer = require('../models/customer');

// Function to create deals
const userCreateDeal = async (req, res) => {
  try {
    Deal.find({
      dealName: req.body.dealName,
      value: req.body.value,
      user: req.user._id,
    }).populate('customer')
      .exec()
      .then((data) => {
        if (data.length >= 1) {
          if ((data[0].customer.name === req.body.customer.name)
            && (data[0].customer.company === req.body.customer.company)) {
            return res.status(422).json({
              message: 'Deal already exists',
              deal: data,
            });
          }
        }
        Customer.find({
          name: req.body.customer.name,
          company: req.body.customer.company,
          email: req.body.customer.email,
          phone: req.body.customer.phone,
        }).exec()
          .then((customer) => {
            if (customer.length >= 1) {
              if (!customer[0].user.includes(user._id)) customer[0].user.push(user._id);

              const newDeal = new Deal({
                _id: new mongoose.Types.ObjectId(),
                dealName: req.body.dealName,
                value: req.body.value,
                customer: customer[0]._id,
              });
              newDeal.user.push(req.user._id);
              newDeal.save()
                .then(() => {
                  res.status(201).json({ success: true, msg: 'Deal created!', deal: newDeal });
                });
            }

            const newCustomer = new Customer({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.customer.name,
              company: req.body.customer.company,
              email: req.body.customer.email,
              phone: req.body.customer.phone,
            });
            newCustomer.user.push(req.user._id);

            newCustomer.save();

            const newDeal = new Deal({
              _id: new mongoose.Types.ObjectId(),
              dealName: req.body.dealName,
              value: req.body.value,
              customer: newCustomer._id,
            });
            newDeal.user.push(req.user._id);

            newDeal.save()
              .then(() => {
                res.status(201).json({ success: true, msg: 'Deal created!', deal: newDeal });
              })
              .catch((error) => {
                console.log(error);
              });
          });
        res.status(201);
      });
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
