const mongoose = require('mongoose');
const Customer = require('../models/customer');

// handler to create deals
const userAddsCustomer = async (req, res) => {
  try {
    Customer.find({
      name: req.body.name,
      company: req.body.company,
      email: req.body.email,
      phone: req.body.phone,
    }).exec()
      .then((data) => {
        if (data.length >= 1) {
          if (!data[0].user.includes(req.user._id)) data[0].user.push(req.user._id);
          return res.status(422).json({
            message: 'Customer already exists',
            deal: data,
          });
        }
        const newCustomer = new Customer({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          company: req.body.company,
          email: req.body.email,
          phone: req.body.phone,
        });
        newCustomer.user.push(req.user._id);

        newCustomer.save()
          .then(() => {
            res.status(201).json({ success: true, msg: 'Customer Created!', deal: newCustomer });
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

// user updates customer
const userUpdateCustomer = (req, res) => {
  Customer.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, {
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    phone: req.body.phone,
  }, { new: true }, (err, customer) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else if (customer != null) {
      res.status(200).json({ success: true, msg: 'Customer updated!' });
    } else {
      res.status(404).json({ success: false, msg: 'Customer not found!' });
    }
  });
};

// Function to delete customer
const userDeleteCustomer = (req, res) => {
  const dealId = req.params.id;
  Customer.findOneAndDelete({ _id: dealId, user: req.user._id }, (err, deal) => {
    if (err) {
      console.log(err);
      res.status(400).json({ success: false, msg: 'Bad request' });
    } else if (deal != null) {
      res.status(200).json({ success: true, msg: 'Customer deleted!' });
    } else {
      res.status(404).json({ success: false, msg: 'Customer not found!' });
    }
  });
};


module.exports.userAddsCustomer = userAddsCustomer;
module.exports.userUpdateCustomer = userUpdateCustomer;
module.exports.userDeleteCustomer = userDeleteCustomer;