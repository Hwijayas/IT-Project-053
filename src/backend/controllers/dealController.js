const mongoose = require('mongoose');
const Deal = require('../models/deal');
const Customer = require('../models/customer');

// Function to create deals
const userCreateDeal = async (req, res) => {
  try {
    // Check if the deal is already in DB
    Deal.find({
      dealName: req.body.dealName,
      value: req.body.value,
    }).populate('customer')
      .exec()
      .then((data) => {
        if (data.length >= 1) {
          // Check if customer is also the same
          if ((data[0].customer.name === req.body.customer.name)
            && (data[0].customer.company === req.body.customer.company)) {
            // Add the user to the deal
            if (!data[0].user.includes(req.user._id)) { data[0].user.push(req.user._id); data[0].save(); }

            // Add the user to customer
            Customer.findById({ _id: data[0].customer._id }, (err, customer) => {
              if (err) {
                console.log(err);
              } else {
                customer.user.push(req.user._id);
                customer.save();
              }
            });
            return res.status(422).json({
              message: 'Deal already exists',
              deal: data,
            });
          }
        } else {
          // Now deal is not in DB
          // Check if the customer present in DB
          Customer.find({
            name: req.body.customer.name,
            company: req.body.customer.company,
            email: req.body.customer.email,
            phone: req.body.customer.phone,
          }).exec()
            .then((customer) => {
              if (customer.length >= 1) {
                // Customer present add a create a new customer and add found customer as ref
                if (!customer[0].user.includes(req.user._id)) customer[0].user.push(req.user._id);

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
              } else {
                // Customer and deal not represnt in DB
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
              }
            });
          res.status(201);
        }
      });
  } catch (error) {
    console.log(error);
  }
};

// Function to update deals
const userUpdateDeal = (req, res) => {
  const dealId = req.params.id;
  const newDealName = req.body.dealName;
  const newValue = req.body.value;

  Deal.findOneAndUpdate({ _id: dealId, user: req.user._id }, {
    dealName: newDealName, value: newValue,
  }, { new: true }, (err, deal) => {
    // Update the customer details
    if (deal != null) {
      Customer.findOneAndUpdate({ _id: deal.customer, user: req.user._id }, {
        name: req.body.customer.name,
        company: req.body.customer.company,
        email: req.body.customer.email,
        phone: req.body.customer.phone,
      }, { new: true }, (err, customer) => { console.log(err); });
    }
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
