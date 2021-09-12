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

module.exports.userAddsCustomer = userAddsCustomer;
